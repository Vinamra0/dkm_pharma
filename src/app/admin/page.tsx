"use client";

import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Package, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';

const defaultStats = [
    {
        name: 'Total Blogs',
        value: '0',
        icon: FileText,
        color: 'from-blue-500 to-blue-600',
        href: '/admin/blogs'
    },
    {
        name: 'Total Products',
        value: '0',
        icon: Package,
        color: 'from-cyan-500 to-cyan-600',
        href: '/admin/products'
    },
];

const quickActions = [
    { name: 'Add New Blog', href: '/admin/blogs/add', color: 'from-blue-600 to-blue-500' },
    { name: 'Add New Product', href: '/admin/products/add', color: 'from-cyan-600 to-cyan-500' },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState(defaultStats);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        let mounted = true;
        async function loadCounts() {
            try {
                const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
                const [blogsRes, prodsRes] = await Promise.all([
                    fetch(`${base}/api/blogs`, { cache: 'no-store' }),
                    fetch(`${base}/api/products`, { cache: 'no-store' })
                ]);
                let blogCount = 0;
                let prodCount = 0;
                if (blogsRes.ok) {
                    const j = await blogsRes.json();
                    if (Array.isArray(j?.data)) blogCount = j.data.length;
                }
                if (prodsRes.ok) {
                    const j = await prodsRes.json();
                    if (Array.isArray(j?.data)) prodCount = j.data.length;
                }
                if (mounted) {
                    setStats([
                        { ...defaultStats[0], value: String(blogCount) },
                        { ...defaultStats[1], value: String(prodCount) }
                    ]);
                }
            } catch (e) {
                // ignore, keep defaults
            }
        }
        loadCounts();
        // load recent activities
        async function loadActivities() {
                try {
                const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
                const [blogsRes, prodsRes] = await Promise.all([
                    fetch(`${base}/api/blogs`, { cache: 'no-store' }),
                    fetch(`${base}/api/products`, { cache: 'no-store' }),
                ]);
                const items: any[] = [];
                if (blogsRes.ok) {
                    const j = await blogsRes.json();
                    if (Array.isArray(j?.data)) {
                        j.data.forEach((b: any) => {
                            const id = String(b.id ?? b._id ?? '');
                            items.push({
                                id,
                                type: 'blog',
                                title: b.title,
                                date: b.updatedAt || b.createdAt || b.date || null,
                                href: `/admin/blogs/edit/${id}`,
                            });
                        });
                    }
                }
                if (prodsRes.ok) {
                    const j = await prodsRes.json();
                    if (Array.isArray(j?.data)) {
                        j.data.forEach((p: any) => {
                            const id = String(p.id ?? p._id ?? '');
                            items.push({
                                id,
                                type: 'product',
                                title: p.name,
                                date: p.updatedAt || p.createdAt || null,
                                href: `/admin/products/edit/${id}`,
                            });
                        });
                    }
                }
                // sort by date desc and take latest 6
                const normalized = items
                    .filter(a => a.date)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 6);
                if (mounted) setActivities(normalized);
            } catch (e) {
                // ignore
            }
        }
        loadActivities();
        return () => { mounted = false };
    }, []);

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
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl"
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
                                    {activities.length === 0 ? (
                                        <div className="text-sm text-slate-500">No recent activity</div>
                                    ) : (
                                        activities.map((a) => (
                                            <div key={`${a.type}-${a.id}`} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${a.type === 'blog' ? 'bg-blue-100' : 'bg-cyan-100'}`}>
                                                    {a.type === 'blog' ? <FileText className="w-5 h-5 text-blue-600" /> : <Package className="w-5 h-5 text-cyan-600" />}
                                                </div>
                                                <div className="flex-1">
                                                    <Link href={a.href} className="text-sm font-medium text-slate-900">
                                                        {a.type === 'blog' ? `Blog: ${a.title}` : `Product: ${a.title}`}
                                                    </Link>
                                                    <p className="text-xs text-slate-500">{a.date ? new Date(a.date).toLocaleString() : 'Unknown'}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
