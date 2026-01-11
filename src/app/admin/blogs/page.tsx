"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Calendar, User } from 'lucide-react';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { getAllBlogs, deleteBlog, type AdminBlogPost } from '@/lib/admin-blog-data';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<AdminBlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        const items = await getAllBlogs();
        setBlogs(items);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            await deleteBlog(id);
            await loadBlogs();
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-midnight mb-2">Blog Posts</h1>
                            <p className="text-slate-600">Manage your blog content</p>
                        </div>
                        <Link href="/admin/blogs/add">
                            <Button variant="premium" size="lg" className="gap-2">
                                <Plus className="w-5 h-5" />
                                Add New Blog
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
                                    placeholder="Search blogs by title, category, or author..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blogs Grid */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Loading blogs...</p>
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-slate-600">No blogs found. Create your first blog post!</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="card-hover h-full flex flex-col">
                                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                                            {blog.image ? (
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    No image
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                                            <p className="text-sm text-slate-600 line-clamp-2 mt-2">{blog.excerpt}</p>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <User className="w-4 h-4" />
                                                    {blog.author}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(blog.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/admin/blogs/edit/${blog.id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
