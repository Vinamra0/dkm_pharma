"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
// no local fallback; fetch products from backend
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
    id: string;
    name: string;
    image: string;
    company: string;
    category: string;
    subCategory: string;
    packageType: string;
    packing: string;
    composition: string;
    dosageForm: string;
    tags: string[];
    generics: string[];
    description: string;
};

type ApiProduct = {
    _id?: string;
    id?: string;
    name?: string;
    image?: string;
    company?: string;
    category?: string;
    subCategory?: string;
    packageType?: string;
    packing?: string;
    composition?: string;
    dosageForm?: string;
    tags?: string[] | null;
    generics?: string[] | null;
    description?: string;
    specifications?: {
        composition?: string;
        dosageForm?: string;
        packaging?: string;
    } | null;
};

type FiltersState = {
    companies: string[];
    categories: string[];
    subCategories: string[];
    packageTypes: string[];
    dosageForms: string[];
    generics: string[];
    tags: string[];
    packing: string;
    composition: string;
};

function MultiSelectField({
    label,
    options,
    selected,
    onToggle,
}: {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
}) {
    return (
        <div className="border border-slate-200 rounded-lg p-2">
            <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-sm font-medium text-slate-700">{label}</p>
                {selected.length > 0 && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {selected.length}
                    </span>
                )}
            </div>
            <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                {options.length > 0 ? (
                    options.map((value) => (
                        <label key={value} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer px-1 py-0.5 rounded hover:bg-slate-50">
                            <input
                                type="checkbox"
                                checked={selected.includes(value)}
                                onChange={() => onToggle(value)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="truncate">{value}</span>
                        </label>
                    ))
                ) : (
                    <p className="text-xs text-slate-400 px-1 py-1">No options</p>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const router = useRouter();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterPopupRef = useRef<HTMLDivElement | null>(null);
    const initializedFromUrlRef = useRef(false);

    const [filters, setFilters] = useState<FiltersState>({
        companies: [],
        categories: [],
        subCategories: [],
        packageTypes: [],
        dosageForms: [],
        generics: [],
        tags: [],
        packing: "",
        composition: "",
    });

    const toggleInArray = (field: keyof Omit<FiltersState, "packing" | "composition">, value: string) => {
        setFilters((prev) => {
            const current = prev[field] as string[];
            const next = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [field]: next } as FiltersState;
        });
    };

    useEffect(() => {
        let mounted = true;
        async function fetchProducts() {
            setLoading(true);
            try {
                const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
                const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
                if (res.ok) {
                    const json = await res.json();
                    if (Array.isArray(json?.data) && mounted) {
                        // map backend shape to frontend expected shape
                        const mapped: Product[] = json.data.map((p: ApiProduct) => {
                            const specs = p.specifications || null;
                            const description = (p.description || '').trim();
                            const composition = (p.composition || specs?.composition || '').trim();

                            return {
                                id: p._id || p.id || '',
                                name: p.name || 'Untitled',
                                image: p.image || '/assets/products/sample-paracetamol.jpg',
                                company: p.company || '',
                                category: p.category || 'General',
                                subCategory: p.subCategory || '',
                                packageType: p.packageType || '',
                                packing: (p.packing || specs?.packaging || '').trim(),
                                // If composition is missing from backend, keep UI functional using description text.
                                composition: composition || description,
                                dosageForm: (p.dosageForm || specs?.dosageForm || '').trim(),
                                tags: Array.isArray(p.tags) ? p.tags : [],
                                generics: Array.isArray(p.generics) ? p.generics : [],
                                description,
                            };
                        });
                        setProducts(mapped);
                    }
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchProducts();
        return () => { mounted = false };
    }, []);

    useEffect(() => {
        if (initializedFromUrlRef.current) return;

        const params = new URLSearchParams(window.location.search);
        const parseList = (key: string) => {
            const value = params.get(key);
            if (!value) return [] as string[];
            return value.split(",").map((item) => item.trim()).filter(Boolean);
        };

        setSearchQuery(params.get("q") || "");
        setFilters({
            companies: parseList("company"),
            categories: parseList("category"),
            subCategories: parseList("subCategory"),
            packageTypes: parseList("packageType"),
            dosageForms: parseList("dosageForm"),
            generics: parseList("generic"),
            tags: parseList("tag"),
            packing: params.get("packing") || "",
            composition: params.get("composition") || "",
        });

        initializedFromUrlRef.current = true;
    }, []);

    useEffect(() => {
        if (!initializedFromUrlRef.current) return;

        const params = new URLSearchParams();
        const setList = (key: string, values: string[]) => {
            if (values.length > 0) params.set(key, values.join(","));
        };

        if (searchQuery.trim()) params.set("q", searchQuery.trim());
        setList("company", filters.companies);
        setList("category", filters.categories);
        setList("subCategory", filters.subCategories);
        setList("packageType", filters.packageTypes);
        setList("dosageForm", filters.dosageForms);
        setList("generic", filters.generics);
        setList("tag", filters.tags);
        if (filters.packing.trim()) params.set("packing", filters.packing.trim());
        if (filters.composition.trim()) params.set("composition", filters.composition.trim());

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [searchQuery, filters, pathname, router]);

    useEffect(() => {
        if (!isFilterOpen) return;

        const onPointerDown = (event: MouseEvent) => {
            if (!filterPopupRef.current) return;
            if (!filterPopupRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", onPointerDown);
        return () => document.removeEventListener("mousedown", onPointerDown);
    }, [isFilterOpen]);

    const uniqueValues = useMemo(() => {
        const companies = Array.from(new Set(products.map((p) => p.company).filter(Boolean))).sort();
        const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
        const subCategories = Array.from(new Set(products.map((p) => p.subCategory).filter(Boolean))).sort();
        const packageTypes = Array.from(new Set(products.map((p) => p.packageType).filter(Boolean))).sort();
        const dosageForms = Array.from(new Set(products.map((p) => p.dosageForm).filter(Boolean))).sort();
        const generics = Array.from(new Set(products.flatMap((p) => p.generics || []).filter(Boolean))).sort();
        const tags = Array.from(new Set(products.flatMap((p) => p.tags || []).filter(Boolean))).sort();
        return { companies, categories, subCategories, packageTypes, dosageForms, generics, tags };
    }, [products]);

    const activeFilterCount =
        filters.companies.length +
        filters.categories.length +
        filters.subCategories.length +
        filters.packageTypes.length +
        filters.dosageForms.length +
        filters.generics.length +
        filters.tags.length +
        (filters.packing.trim() ? 1 : 0) +
        (filters.composition.trim() ? 1 : 0);

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.trim().toLowerCase();
        
        // Search across all text fields
        const searchableText = [
            product.name,
            product.company,
            product.category,
            product.subCategory,
            product.packageType,
            product.packing,
            product.composition,
            product.dosageForm,
            product.description,
            ...(product.tags || []),
            ...(product.generics || []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch = !query || searchableText.includes(query);

        // Multi-select filters - product must match IF filter is selected
        const matchesCompany =
            filters.companies.length === 0 ||
            (product.company && filters.companies.includes(product.company));

        const matchesCategory =
            filters.categories.length === 0 ||
            (product.category && filters.categories.includes(product.category));

        const matchesSubCategory =
            filters.subCategories.length === 0 ||
            (product.subCategory && filters.subCategories.includes(product.subCategory));

        const matchesPackageType =
            filters.packageTypes.length === 0 ||
            (product.packageType && filters.packageTypes.includes(product.packageType));

        const matchesDosageForm =
            filters.dosageForms.length === 0 ||
            (product.dosageForm && filters.dosageForms.includes(product.dosageForm));

        // Array filters - product must contain at least one selected value
        const matchesGeneric =
            filters.generics.length === 0 ||
            (Array.isArray(product.generics) &&
                filters.generics.some((g) => product.generics.includes(g)));

        const matchesTag =
            filters.tags.length === 0 ||
            (Array.isArray(product.tags) &&
                filters.tags.some((t) => product.tags.includes(t)));

        // Text filters - product field must contain the filter text
        const matchesPacking =
            !filters.packing.trim() ||
            (product.packing &&
                product.packing.toLowerCase().includes(filters.packing.toLowerCase()));

        const compositionFilter = filters.composition.trim().toLowerCase();
        const compositionSource = [product.composition, product.description]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
        const matchesComposition = !compositionFilter || compositionSource.includes(compositionFilter);

        return (
            matchesSearch &&
            matchesCompany &&
            matchesCategory &&
            matchesSubCategory &&
            matchesPackageType &&
            matchesDosageForm &&
            matchesPacking &&
            matchesComposition &&
            matchesGeneric &&
            matchesTag
        );
    });

    const resetFilters = () => {
        setFilters({
            companies: [],
            categories: [],
            subCategories: [],
            packageTypes: [],
            dosageForms: [],
            generics: [],
            tags: [],
            packing: "",
            composition: "",
        });
    };

    return (
        <div className="min-h-screen page-surface py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">
                        Our Products
                    </h1>
                    <p className="text-lg text-slate-600">
                        Discover our wide range of high-quality pharmaceutical products designed for your well-being.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative" ref={filterPopupRef}>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow duration-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                type="button"
                                variant={activeFilterCount > 0 ? "default" : "outline"}
                                className="rounded-full h-12 px-5 relative"
                                onClick={() => setIsFilterOpen((prev) => !prev)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold bg-white/20 rounded-full h-5 min-w-5 px-1.5">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </Button>
                        </div>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <>
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="md:hidden fixed inset-0 bg-slate-950/30 backdrop-blur-[1px] z-20"
                                        onClick={() => setIsFilterOpen(false)}
                                        aria-label="Close filters"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                        transition={{ duration: 0.18 }}
                                        className="fixed inset-x-4 top-24 bottom-6 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 md:p-5 overflow-hidden md:absolute md:top-full md:right-0 md:bottom-auto md:inset-x-auto md:mt-3 md:w-[680px] md:max-h-[70vh]"
                                    >
                                        <div className="h-full overflow-y-auto pr-1">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <MultiSelectField
                                                    label="Company"
                                                    options={uniqueValues.companies}
                                                    selected={filters.companies}
                                                    onToggle={(value) => toggleInArray("companies", value)}
                                                />
                                                <MultiSelectField
                                                    label="Category"
                                                    options={uniqueValues.categories}
                                                    selected={filters.categories}
                                                    onToggle={(value) => toggleInArray("categories", value)}
                                                />
                                                <MultiSelectField
                                                    label="Sub-category"
                                                    options={uniqueValues.subCategories}
                                                    selected={filters.subCategories}
                                                    onToggle={(value) => toggleInArray("subCategories", value)}
                                                />
                                                <MultiSelectField
                                                    label="Package Type"
                                                    options={uniqueValues.packageTypes}
                                                    selected={filters.packageTypes}
                                                    onToggle={(value) => toggleInArray("packageTypes", value)}
                                                />
                                                <MultiSelectField
                                                    label="Dosage Form"
                                                    options={uniqueValues.dosageForms}
                                                    selected={filters.dosageForms}
                                                    onToggle={(value) => toggleInArray("dosageForms", value)}
                                                />
                                                <MultiSelectField
                                                    label="Generics"
                                                    options={uniqueValues.generics}
                                                    selected={filters.generics}
                                                    onToggle={(value) => toggleInArray("generics", value)}
                                                />
                                                <MultiSelectField
                                                    label="Tags"
                                                    options={uniqueValues.tags}
                                                    selected={filters.tags}
                                                    onToggle={(value) => toggleInArray("tags", value)}
                                                />
                                                <div className="border border-slate-200 rounded-lg p-3 space-y-3">
                                                    <p className="text-sm font-medium text-slate-700">Text Filters</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Packing contains..."
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                                        value={filters.packing}
                                                        onChange={(e) => setFilters((prev) => ({ ...prev, packing: e.target.value }))}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Composition contains... (fallback: description)"
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                                        value={filters.composition}
                                                        onChange={(e) => setFilters((prev) => ({ ...prev, composition: e.target.value }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-end">
                                                <div className="flex gap-2">
                                                    <Button type="button" variant="ghost" className="h-9 px-3" onClick={resetFilters}>
                                                        Clear
                                                    </Button>
                                                    <Button type="button" variant="outline" className="h-9 px-3" onClick={() => setIsFilterOpen(false)}>
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <div className="col-span-full text-center py-20">Loading...</div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={product.id}
                                    className="surface-card rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="h-52 bg-slate-100 relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${product.image})` }}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <Link href={`/products/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                                            {product.description}
                                        </p>
                                        <Button variant="outline" className="w-full mt-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300" asChild>
                                            <Link href={`/products/${product.id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                    <Filter className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                                <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
                                <Button
                                    variant="link"
                                    className="mt-4 text-blue-600"
                                    onClick={() => { setSearchQuery(""); resetFilters(); }}
                                >
                                    Clear all filters
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </div>
    );
}
