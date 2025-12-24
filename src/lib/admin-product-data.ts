export interface AdminProduct {
    id: string
    name: string
    packing: string
    image: string
    composition: string
    company: string
    category: string
    tags: string[]
    generics: string[]
    subCategory: string
    packageType: string
}

// Local storage key
const STORAGE_KEY = 'admin_products';

// Initialize with demo data
const initialProducts: AdminProduct[] = [
    {
        id: "1",
        name: "Amoxyclav-625",
        packing: "10 x 6 Tablets",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        composition: "Amoxycillin 500mg + Clavulanic Acid 125mg",
        company: "DK Medi Group",
        category: "Antibiotics",
        tags: ["Antibiotic", "Prescription"],
        generics: ["Amoxicillin", "Clavulanic Acid"],
        subCategory: "Tablets",
        packageType: "Blister"
    },
    {
        id: "2",
        name: "Paracetamol-500",
        packing: "10 x 10 Tablets",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        composition: "Paracetamol 500mg",
        company: "DK Medi Group",
        category: "Pain Relief",
        tags: ["Pain Relief", "Fever", "OTC"],
        generics: ["Paracetamol"],
        subCategory: "Tablets",
        packageType: "Strip"
    },
    {
        id: "3",
        name: "Vitamin D3 Injection",
        packing: "1ml Ampoule",
        image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=800",
        composition: "Cholecalciferol 600000 IU",
        company: "DK Medi Group",
        category: "Vitamins",
        tags: ["Vitamin", "Injectable", "Prescription"],
        generics: ["Vitamin D3", "Cholecalciferol"],
        subCategory: "Injections",
        packageType: "Vial"
    },
];

// Get all products from localStorage
export function getAllProducts(): AdminProduct[] {
    if (typeof window === 'undefined') return initialProducts;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }
    return JSON.parse(stored);
}

// Get single product by ID
export function getProductById(id: string): AdminProduct | undefined {
    const products = getAllProducts();
    return products.find(product => product.id === id);
}

// Add new product
export function addProduct(product: Omit<AdminProduct, 'id'>): AdminProduct {
    const products = getAllProducts();
    const newProduct: AdminProduct = {
        ...product,
        id: Date.now().toString(),
    };
    products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return newProduct;
}

// Update existing product
export function updateProduct(id: string, updates: Partial<AdminProduct>): boolean {
    const products = getAllProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return false;

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
}

// Delete product
export function deleteProduct(id: string): boolean {
    const products = getAllProducts();
    const filtered = products.filter(product => product.id !== id);
    if (filtered.length === products.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

// Category options
export const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Antibiotics', label: 'Antibiotics' },
    { value: 'Pain Relief', label: 'Pain Relief' },
    { value: 'Vitamins', label: 'Vitamins' },
    { value: 'Cardiac', label: 'Cardiac' },
    { value: 'Gastrointestinal', label: 'Gastrointestinal' },
    { value: 'Respiratory', label: 'Respiratory' },
    { value: 'Diabetes', label: 'Diabetes' },
];

export const subCategoryOptions = [
    { value: '', label: 'Select Sub-Category' },
    { value: 'Tablets', label: 'Tablets' },
    { value: 'Capsules', label: 'Capsules' },
    { value: 'Injections', label: 'Injections' },
    { value: 'Syrups', label: 'Syrups' },
    { value: 'Drops', label: 'Drops' },
    { value: 'Topical', label: 'Topical' },
];

export const packageTypeOptions = [
    { value: '', label: 'Select Package Type' },
    { value: 'Blister', label: 'Blister' },
    { value: 'Strip', label: 'Strip' },
    { value: 'Bottle', label: 'Bottle' },
    { value: 'Vial', label: 'Vial' },
    { value: 'Tube', label: 'Tube' },
    { value: 'Box', label: 'Box' },
];
