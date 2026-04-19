"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { ImageUpload } from '@/components/ui/ImageUpload';
import { addBlog } from '@/lib/admin-blog-data';

const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Education', label: 'Education' },
    { value: 'Health Awareness', label: 'Health Awareness' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'News', label: 'News' },
    { value: 'Research', label: 'Research' },
];

export default function AddBlogPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: '',
        slug: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Auto-generate slug from title
        if (field === 'title') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.image.trim()) newErrors.image = 'Image URL is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            await addBlog(formData);
            router.push('/admin/blogs');
        } catch {
            alert('Failed to add blog post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/admin/blogs">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blogs
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-midnight mb-2">Add New Blog Post</h1>
                        <p className="text-slate-600">Create a new blog post for your website</p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Blog Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        label="Title"
                                        placeholder="Enter blog title"
                                        value={formData.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        error={errors.title}
                                        required
                                    />

                                    <Input
                                        label="Slug"
                                        placeholder="blog-url-slug"
                                        value={formData.slug}
                                        onChange={(e) => handleChange('slug', e.target.value)}
                                        error={errors.slug}
                                        required
                                    />

                                    <Textarea
                                        label="Excerpt"
                                        placeholder="Brief summary of the blog post"
                                        value={formData.excerpt}
                                        onChange={(e) => handleChange('excerpt', e.target.value)}
                                        error={errors.excerpt}
                                        rows={3}
                                        required
                                    />

                                    <Textarea
                                        label="Content"
                                        placeholder="Full blog post content"
                                        value={formData.content}
                                        onChange={(e) => handleChange('content', e.target.value)}
                                        error={errors.content}
                                        rows={10}
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Author"
                                            placeholder="Author name"
                                            value={formData.author}
                                            onChange={(e) => handleChange('author', e.target.value)}
                                            error={errors.author}
                                            required
                                        />

                                        <Input
                                            label="Date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleChange('date', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <Select
                                        label="Category"
                                        options={categoryOptions}
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        error={errors.category}
                                        required
                                    />

                                    <ImageUpload
                                        label="Featured Image"
                                        value={formData.image}
                                        onChange={(path) => handleChange('image', path)}
                                        type="blogs"
                                        error={errors.image}
                                        required
                                    />

                                    <div className="flex gap-4 pt-4">
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
                                                    Publish Blog
                                                </>
                                            )}
                                        </Button>
                                        <Link href="/admin/blogs">
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
