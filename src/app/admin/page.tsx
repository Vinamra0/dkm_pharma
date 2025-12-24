"use client";

import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Package, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

const stats = [
    {
        name: 'Total Blogs',
        value: '24',
        icon: FileText,
        color: 'from-blue-500 to-blue-600',
        href: '/admin/blogs'
    },
    {
        name: 'Total Products',
        value: '15',
        icon: Package,
        color: 'from-cyan-500 to-cyan-600',
        href: '/admin/products'
    },
    {
        name: 'Views This Month',
        value: '12.5K',
        icon: TrendingUp,
        color: 'from-purple-500 to-purple-600',
    },
];

const quickActions = [
    { name: 'Add New Blog', href: '/admin/blogs/add', color: 'from-blue-600 to-blue-500' },
    { name: 'Add New Product', href: '/admin/products/add', color: 'from-cyan-600 to-cyan-500' },
];

export default function AdminDashboard() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-midnight mb-2">Welcome back!</h1>
                        <p className="text-slate-600">Here's what's happening with your content today.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className="card-hover cursor-pointer overflow-hidden">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardDescription className="text-xs uppercase tracking-wide font-medium">
                                                {stat.name}
                                            </CardDescription>
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                                <stat.icon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-midnight">{stat.value}</div>
                                        {stat.href && (
                                            <Link href={stat.href} className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block">
                                                View all →
                                            </Link>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Manage your content efficiently</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {quickActions.map((action) => (
                                        <Link key={action.name} href={action.href}>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    variant="premium"
                                                    size="lg"
                                                    className={`w-full bg-gradient-to-r ${action.color}`}
                                                >
                                                    {action.name}
                                                </Button>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest updates to your content</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">New blog post published</p>
                                            <p className="text-xs text-slate-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                            <Package className="w-5 h-5 text-cyan-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">Product updated</p>
                                            <p className="text-xs text-slate-500">5 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
