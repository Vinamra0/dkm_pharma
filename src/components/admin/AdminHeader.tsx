"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, FileText, Package, Briefcase, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Applications', href: '/admin/applications', icon: Mail },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Careers', href: '/admin/careers', icon: Briefcase },
];

export function AdminHeader() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-white/70 bg-[linear-gradient(120deg,rgba(255,255,255,0.9),rgba(235,246,255,0.78))] backdrop-blur-xl shadow-[0_14px_34px_-24px_rgba(14,116,144,0.55)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md border border-blue-100/80 bg-white/88">
                            <Image
                                src="/assets/branding/dkm-favicon-clean.png"
                                alt="DKM"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-midnight">Admin Portal</h1>
                            <p className="text-xs text-slate-500">DK Medi Group</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors relative",
                                            isActive
                                                ? "text-blue-700 bg-blue-50/90"
                                                : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/70"
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-blue-50/90 rounded-lg -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                        <Button
                            onClick={logout}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap",
                                        isActive
                                            ? "text-blue-700 bg-blue-50/90"
                                            : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
