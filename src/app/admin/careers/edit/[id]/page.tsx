"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getCareerById, updateCareer } from '@/lib/admin-career-data';

export default function EditCareerPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();

    const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', description: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            const c = await getCareerById(id);
            if (!c) {
                alert('Job not found');
                router.push('/admin/careers');
                return;
            }
            setForm({ title: c.title || '', location: c.location || '', type: c.type || 'Full-time', description: c.description || '' });
            setLoading(false);
        })();
    }, [id]);

    const handleChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const ok = await updateCareer(id, form as any);
            if (!ok) throw new Error('Update failed');
            router.push('/admin/careers');
        } catch (err) {
            alert('Failed to update job');
        } finally { setSaving(false); }
    };

    if (loading) return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50"><AdminHeader /><main className="max-w-3xl mx-auto p-6">Loading...</main></div>
        </ProtectedRoute>
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />
                <main className="max-w-3xl mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Link href="/admin/careers"><Button variant="ghost">Back to Jobs</Button></Link>
                        <h1 className="text-2xl font-bold mt-4">Edit Job Posting</h1>
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
                            <Button type="submit" variant="premium" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                            <Link href="/admin/careers"><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
}
