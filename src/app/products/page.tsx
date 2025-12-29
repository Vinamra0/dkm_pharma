"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
// no local fallback; fetch products from backend
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
                        const mapped = json.data.map((p: any) => ({
                            id: p._id || p.id,
                            name: p.name,
                            category: p.category || 'General',
                            description: p.composition || p.description || '',
                            image: p.image || '/assets/products/sample-paracetamol.jpg',
                            specifications: {
                                composition: p.composition || '',
                                dosageForm: p.dosageForm || '',
                                packaging: p.packing || p.packageType || ''
                            }
                        }));
                        setProducts(mapped);
                    }
                }
            } catch (e) {
                // on error keep products empty
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchProducts();
        return () => { mounted = false };
    }, []);

    const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">Our Products</h1>
                    <p className="text-lg text-slate-600">
                        Discover our wide range of high-quality pharmaceutical products designed for your well-being.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
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

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-blue-600 hover:bg-blue-700 shadow-md transform scale-105"
                                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
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
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
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
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
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
