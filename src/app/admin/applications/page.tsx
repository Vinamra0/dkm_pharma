"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Calendar, Mail, Download, Briefcase } from 'lucide-react';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { getAllApplications, deleteApplication, type AdminApplication } from '@/lib/admin-application-data';
import { downloadCvUrl, CV_BASE } from '@/lib/api-base';

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<AdminApplication[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadApplications = async () => {
        const items = await getAllApplications();
        setApplications(items);
        setIsLoading(false);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            const items = await getAllApplications();
            if (!mounted) return;
            setApplications(items);
            setIsLoading(false);
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this application?')) {
            await deleteApplication(id);
            await loadApplications();
        }
    };

    const filtered = applications.filter((a) =>
        (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.position || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Download URLs are built via `downloadCvUrl()` which reads the configured env var.

    async function handleDownload(storedName?: string, originalName?: string, downloadUrl?: string) {
        const candidateUrls: string[] = []

        // Always try the local route first if we have stored filename metadata.
        if (storedName) {
            candidateUrls.push(`/api/admin/applications/cv/${encodeURIComponent(storedName)}`)
            candidateUrls.push(downloadCvUrl(storedName))
        }

        // Legacy/explicit URL from backend response.
        if (downloadUrl) {
            if (/^https?:\/\//i.test(downloadUrl)) {
                candidateUrls.push(downloadUrl)
            } else if (downloadUrl.startsWith('/')) {
                candidateUrls.push(`${CV_BASE.replace(/\/$/, '')}${downloadUrl}`)
            } else {
                candidateUrls.push(`${CV_BASE.replace(/\/$/, '')}/${downloadUrl}`)
            }
        }

        const uniqueCandidates = Array.from(new Set(candidateUrls.filter(Boolean)))
        if (uniqueCandidates.length === 0) return

        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
            const headers: Record<string,string> = {}
            if (token) headers['Authorization'] = `Bearer ${token}`

            let selectedBytes: ArrayBuffer | null = null
            let selectedContentType = ''
            let usedUrl = ''
            for (const url of uniqueCandidates) {
                // Log each candidate URL for debugging
                console.debug('[Applications] trying download URL:', url)
                const attempt = await fetch(url, { headers })
                if (!attempt.ok) continue

                const contentType = (attempt.headers.get('content-type') || '').toLowerCase()
                if (contentType.includes('application/json') || contentType.includes('text/html')) {
                    continue
                }

                const bytes = await attempt.arrayBuffer()
                if (bytes.byteLength === 0) continue

                const isPdf = contentType.includes('application/pdf')
                const isWord =
                    contentType.includes('application/msword') ||
                    contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')

                // Validate file signatures so non-file payloads are never downloaded as CVs.
                const head = new Uint8Array(bytes.slice(0, 5))
                const looksLikePdf =
                    head.length >= 5 &&
                    head[0] === 0x25 &&
                    head[1] === 0x50 &&
                    head[2] === 0x44 &&
                    head[3] === 0x46 &&
                    head[4] === 0x2d

                if (isPdf && !looksLikePdf) continue
                if (!isPdf && !isWord && !looksLikePdf) continue

                selectedBytes = bytes
                selectedContentType = contentType
                usedUrl = url
                break
            }

            if (!selectedBytes) {
                alert('Failed to download a valid CV file')
                return
            }

            const blob = new Blob([selectedBytes], {
                type: selectedContentType || 'application/octet-stream',
            })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = originalName || (downloadUrl ? usedUrl.split('/').pop() || 'download' : storedName || 'download')
            document.body.appendChild(a)
            a.click()
            a.remove()
            // Revoke later to avoid browser races that can corrupt/abort downloads.
            setTimeout(() => URL.revokeObjectURL(url), 60_000)
        } catch (e) {
            console.error(e)
            alert('Failed to download CV')
        }
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50">
                <AdminHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-midnight mb-2">Applications</h1>
                            <p className="text-slate-600">Manage job applications</p>
                        </div>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Search applications by name, email, or position..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Loading applications...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-slate-600">No applications found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((app, index) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="card-hover h-full flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="text-lg">{app.name || 'Unnamed Applicant'}</CardTitle>
                                            <p className="text-sm text-slate-600 mt-2 line-clamp-2">{app.position || '—'}</p>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Mail className="w-4 h-4" />
                                                    {app.email || '—'}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Briefcase className="w-4 h-4" />
                                                    {app.position || '—'}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                       <Button
                                                           variant="outline"
                                                           size="sm"
                                                           className="w-full gap-2"
                                                           disabled={!app.storedName && !app.downloadUrl}
                                                           onClick={() => handleDownload(app.storedName, app.originalName, app.downloadUrl)}
                                                       >
                                                        <Download className="w-4 h-4" />
                                                        Download CV
                                                    </Button>
                                                </div>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(app.id)}
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
