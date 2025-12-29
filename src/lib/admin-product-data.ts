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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export async function getAllProducts(): Promise<AdminProduct[]> {
    try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) return [];
        const json = await res.json();
        const raw = (json.data || []) as any[];
        const normalized = raw.map((p) => ({ ...(p || {}), id: String(p.id ?? p._id ?? ''), tags: p.tags ?? [], generics: p.generics ?? [] }));
        return normalized as AdminProduct[];
    } catch (e) {
        return [];
    }
}

// Get single product by ID
export async function getProductById(id: string): Promise<AdminProduct | undefined> {
    try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) return undefined;
        const json = await res.json();
        const p = json.data as any;
        if (!p) return undefined;
        return { ...(p || {}), id: String(p.id ?? p._id ?? ''), tags: p.tags ?? [], generics: p.generics ?? [] } as AdminProduct | undefined;
    } catch (e) {
        const products = await getAllProducts();
        return products.find(product => product.id === id);
    }
}

// Add new product
export async function addProduct(product: Omit<AdminProduct, 'id'>): Promise<AdminProduct> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(product),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to add product');
    return { ...(json.product || {}), id: String(json.product._id) } as AdminProduct;
}

// Update existing product
export async function updateProduct(id: string, updates: Partial<AdminProduct>): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updates),
    });
    return res.ok;
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return res.ok;
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
