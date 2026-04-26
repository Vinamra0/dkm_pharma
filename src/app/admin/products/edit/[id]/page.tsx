"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { TagInput } from '@/components/ui/TagInput';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { getProductById, updateProduct, categoryOptions, subCategoryOptions, packageTypeOptions } from '@/lib/admin-product-data';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        packing: '',
        image: '',
        composition: '',
        dosageForm: '',
        company: '',
        category: '',
        tags: [] as string[],
        generics: [] as string[],
        subCategory: '',
        packageType: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        (async () => {
            const product = await getProductById(productId);
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    packing: product.packing,
                    image: product.image,
                    composition: product.composition,
                    dosageForm: product.dosageForm,
                    company: product.company,
                    category: product.category,
                    tags: product.tags,
                    generics: product.generics,
                    subCategory: product.subCategory,
                    packageType: product.packageType,
                });
            } else {
                router.push('/admin/products');
            }
            setIsLoading(false);
        })();
    }, [productId, router]);

    const handleChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.packing.trim()) newErrors.packing = 'Packing is required';
        if (!formData.composition.trim()) newErrors.composition = 'Composition is required';
        if (!formData.dosageForm.trim()) newErrors.dosageForm = 'Dosage form is required';
        if (!formData.company.trim()) newErrors.company = 'Company is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
        if (!formData.packageType) newErrors.packageType = 'Package type is required';
        if (!formData.image.trim()) newErrors.image = 'Image URL is required';
        if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';
        if (formData.generics.length === 0) newErrors.generics = 'At least one generic name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            await updateProduct(productId, formData);
            router.push('/admin/products');
        } catch {
            alert('Failed to update product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen page-surface">
                <AdminHeader />

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <Link href="/admin/products">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Products
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-midnight mb-2">Edit Product</h1>
                        <p className="text-slate-600">Update product details</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-midnight">Basic Information</h3>

                                        <Input
                                            label="Product Name"
                                            placeholder="e.g., Amoxyclav-625"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            error={errors.name}
                                            required
                                        />

                                        <Textarea
                                            label="Description"
                                            placeholder="e.g., Broad-spectrum antibiotic for bacterial infection management"
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            error={errors.description}
                                            rows={3}
                                            required
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Company"
                                                placeholder="e.g., DK Medi Group"
                                                value={formData.company}
                                                onChange={(e) => handleChange('company', e.target.value)}
                                                error={errors.company}
                                                required
                                            />

                                            <Input
                                                label="Packing"
                                                placeholder="e.g., 10 x 15 Tabs"
                                                value={formData.packing}
                                                onChange={(e) => handleChange('packing', e.target.value)}
                                                error={errors.packing}
                                                required
                                            />
                                        </div>

                                        <Textarea
                                            label="Composition"
                                            placeholder="e.g., Amoxycillin 500mg + Clavulanic Acid 125mg"
                                            value={formData.composition}
                                            onChange={(e) => handleChange('composition', e.target.value)}
                                            error={errors.composition}
                                            rows={3}
                                            required
                                        />

                                        <Input
                                            label="Dosage Form"
                                            placeholder="e.g., Tablet, Capsule, Syrup"
                                            value={formData.dosageForm}
                                            onChange={(e) => handleChange('dosageForm', e.target.value)}
                                            error={errors.dosageForm}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-200">
                                        <h3 className="text-lg font-semibold text-midnight">Categories</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <Select
                                                label="Category"
                                                options={categoryOptions}
                                                value={formData.category}
                                                onChange={(e) => handleChange('category', e.target.value)}
                                                error={errors.category}
                                                required
                                            />

                                            <Select
                                                label="Sub-Category"
                                                options={subCategoryOptions}
                                                value={formData.subCategory}
                                                onChange={(e) => handleChange('subCategory', e.target.value)}
                                                error={errors.subCategory}
                                                required
                                            />

                                            <Select
                                                label="Package Type"
                                                options={packageTypeOptions}
                                                value={formData.packageType}
                                                onChange={(e) => handleChange('packageType', e.target.value)}
                                                error={errors.packageType}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-200">
                                        <h3 className="text-lg font-semibold text-midnight">Tags & Generic Names</h3>

                                        <TagInput
                                            label="Tags"
                                            placeholder="Type a tag and press Enter"
                                            value={formData.tags}
                                            onChange={(tags) => handleChange('tags', tags)}
                                            error={errors.tags}
                                        />

                                        <TagInput
                                            label="Generic Names"
                                            placeholder="Type a generic name and press Enter"
                                            value={formData.generics}
                                            onChange={(generics) => handleChange('generics', generics)}
                                            error={errors.generics}
                                        />
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-200">
                                        <h3 className="text-lg font-semibold text-midnight">Product Image</h3>

                                        <ImageUpload
                                            label="Product Image"
                                            value={formData.image}
                                            onChange={(path) => handleChange('image', path)}
                                            type="products"
                                            error={errors.image}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-6 border-t border-slate-200">
                                        <Button
                                            type="submit"
                                            variant="premium"
                                            size="lg"
                                            className="gap-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Update Product
                                                </>
                                            )}
                                        </Button>
                                        <Link href="/admin/products">
                                            <Button type="button" variant="outline" size="lg">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
