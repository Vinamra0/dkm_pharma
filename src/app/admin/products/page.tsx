"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Package as PackageIcon } from 'lucide-react';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { getAllProducts, deleteProduct, type AdminProduct } from '@/lib/admin-product-data';

export default function ProductsPage() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadProducts = async () => {
        const items = await getAllProducts();
        setProducts(items);
        setIsLoading(false);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            const items = await getAllProducts();
            if (!mounted) return;
            setProducts(items);
            setIsLoading(false);
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            await loadProducts();
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-midnight mb-2">Products</h1>
                            <p className="text-slate-600">Manage your product catalog</p>
                        </div>
                        <Link href="/admin/products/add">
                            <Button variant="premium" size="lg" className="gap-2">
                                <Plus className="w-5 h-5" />
                                Add New Product
                            </Button>
                        </Link>
                    </div>

                    {/* Search */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products by name, category, company, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products Table */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Loading products...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <PackageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-600">No products found. Create your first product!</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Packing
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Tags
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {filteredProducts.map((product, index) => (
                                            <motion.tr
                                                key={product.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={48}
                                                            height={48}
                                                            unoptimized
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-slate-900">{product.name}</div>
                                                            <div className="text-sm text-slate-500">{product.composition}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-slate-900">{product.category}</div>
                                                    <div className="text-xs text-slate-500">{product.subCategory}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-900">
                                                    {product.company}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-900">
                                                    {product.packing}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {(product.tags || []).slice(0, 2).map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {(product.tags || []).length > 2 && (
                                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                                +{product.tags.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/admin/products/edit/${product.id}`}>
                                                            <Button variant="outline" size="icon" className="p-0" aria-label="Edit product">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="icon"
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-0 bg-red-600 hover:bg-red-700 text-white"
                                                            aria-label="Delete product"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
