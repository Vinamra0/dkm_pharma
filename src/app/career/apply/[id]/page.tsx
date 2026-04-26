import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { getPublicCareers } from '@/lib/career-data'

const STD_CODES = [
    { code: '+977', country: 'Nepal' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+61', country: 'Australia' },
]

type PageProps = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ submitted?: string; title?: string }>
}

export default async function CareerApplyPage({ params, searchParams }: PageProps) {
    const { id } = await params
    const query = await searchParams
    const jobs = await getPublicCareers()
    const job = jobs.find((item) => item.id === id)

    if (!job && !query.title) {
        notFound()
    }

    const title = job?.title || query.title || 'Open Position'
    const submitted = query.submitted === '1'

    return (
        <div className="min-h-screen page-surface py-12">
            <Container>
                <div className="mx-auto max-w-4xl space-y-8">
                    <div className="space-y-4">
                        <Link href="/career" className="text-sm font-medium text-blue-700 hover:text-blue-800">
                            Back to careers
                        </Link>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Career Application</p>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Apply for {title}</h1>
                            <p className="mt-3 max-w-2xl text-slate-600">
                                Submit your details and CV through this dedicated application page. This flow avoids the unreliable inline modal and keeps the full application process directly accessible.
                            </p>
                        </div>
                    </div>

                    {submitted ? (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-900">
                            <h2 className="text-lg font-semibold">Application submitted</h2>
                            <p className="mt-1 text-sm">Your application has been recorded successfully. Our team can now review it from the admin panel.</p>
                        </div>
                    ) : null}

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-3xl border border-slate-200 surface-card p-8 shadow-sm">
                            <form action="/career/apply/submit" method="post" encType="multipart/form-data" className="space-y-5">
                                <input type="hidden" name="jobId" value={job?.id || id} />
                                <input type="hidden" name="jobTitle" value={title} />

                                <div className="grid gap-5 md:grid-cols-2">
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>Full Name</span>
                                        <input name="name" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    </label>
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>Email</span>
                                        <input name="email" type="email" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    </label>
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>STD Code</span>
                                        <select name="stdCode" defaultValue="+977" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                            {STD_CODES.map((item) => (
                                                <option key={item.code} value={item.code}>{item.code} ({item.country})</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>Contact Number (10 digits)</span>
                                        <input name="phone" inputMode="numeric" pattern="[0-9]{10}" placeholder="5386780" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    </label>
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>Educational Qualification</span>
                                        <input name="education" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    </label>
                                    <label className="space-y-2 text-sm font-medium text-slate-700">
                                        <span>Current Location</span>
                                        <input name="location" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                    </label>
                                </div>

                                <label className="space-y-2 text-sm font-medium text-slate-700">
                                    <span>Experience (If Any)</span>
                                    <input name="experience" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                </label>

                                <label className="space-y-2 text-sm font-medium text-slate-700">
                                    <span>Upload CV</span>
                                    <input name="cv" type="file" accept=".pdf,.doc,.docx" required className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800" />
                                </label>

                                <label className="space-y-2 text-sm font-medium text-slate-700">
                                    <span>Cover Letter (optional)</span>
                                    <textarea name="coverLetter" rows={6} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                </label>

                                <div className="flex flex-wrap gap-3">
                                    <Button type="submit">Submit Information</Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href="/career">Cancel</Link>
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <aside className="rounded-3xl border border-slate-200 surface-card p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-900">Role Snapshot</h2>
                            <div className="mt-6 space-y-4 text-sm text-slate-600">
                                <div>
                                    <p className="font-medium text-slate-900">Position</p>
                                    <p>{title}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Location</p>
                                    <p>{job?.location || 'See career listing'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Employment Type</p>
                                    <p>{job?.type || 'See career listing'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Department</p>
                                    <p>{job?.department || 'General'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Description</p>
                                    <p>{job?.description || 'Complete the application form to register your interest in this role.'}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </Container>
        </div>
    )
}
