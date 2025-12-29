"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { getAllCareers, deleteCareer } from '@/lib/admin-career-data';
import { Edit, Trash2 } from 'lucide-react';

export default function CareersAdminPage() {
    const [careers, setCareers] = useState<any[]>([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const list = await getAllCareers();
        setCareers(list);
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this job posting?')) return;
        const ok = await deleteCareer(id);
        if (ok) load();
        else alert('Failed to delete');
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />
                <main className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">Job Postings</h1>
                        <Link href="/admin/careers/add">
                            <Button variant="premium">Add New Job</Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {careers.length === 0 ? (
                            <div>No job postings yet.</div>
                        ) : (
                            careers.map((c) => (
                                <div key={c.id} className="p-4 bg-white rounded shadow-sm flex justify-between items-start">
                                    <div>
                                        <div className="text-lg font-semibold">{c.title}</div>
                                        <div className="text-sm text-slate-600">{c.location} • {c.type}</div>
                                        <div className="mt-2 text-slate-700">{c.description?.slice?.(0, 200)}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 ml-4">
                                        <Link href={`/admin/careers/edit/${c.id}`}>
                                            <Button variant="outline" size="icon" className="p-0" aria-label="Edit job">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            size="icon"
                                            onClick={() => handleDelete(c.id)}
                                            className="p-0 bg-red-600 hover:bg-red-700 text-white"
                                            aria-label="Delete job"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
