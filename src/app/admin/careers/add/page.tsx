"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { addCareer } from '@/lib/admin-career-data';

export default function AddCareerPage() {
    const router = useRouter();
    const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return alert('Title required');
        setIsSubmitting(true);
        try {
            await addCareer(form);
            router.push('/admin/careers');
        } catch {
            alert('Failed to add job');
        } finally { setIsSubmitting(false); }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />
                <main className="max-w-3xl mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Link href="/admin/careers">
                            <Button variant="ghost">Back to Jobs</Button>
                        </Link>
                        <h1 className="text-2xl font-bold mt-4">Add Job Posting</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-sm">
                        <Input label="Title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Location" value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
                            <select className="input" value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                            </select>
                        </div>
                        <Textarea label="Description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={6} />

                        <div className="flex gap-4">
                            <Button type="submit" variant="premium" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Add Job'}</Button>
                            <Link href="/admin/careers"><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
}
