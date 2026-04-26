import { notFound } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { API_BASE } from "@/lib/api-base"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const base = API_BASE
    let post: { title: string; excerpt: string; content: string; image: string; category: string; date: string; author: string } | null = null
    try {
        const res = await fetch(`${base}/api/blogs/${slug}`, { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (json?.data) post = json.data
        }
    } catch {
        // ignore
    }

    if (!post) notFound()

    return (
        <div className="min-h-screen page-surface py-12">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2 surface-card rounded-lg shadow-sm border overflow-hidden">
                        <div className="h-[400px] w-full relative bg-slate-200">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                        </div>
                        <div className="p-8">
                            <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-slate-500 hover:text-primary" asChild>
                                <Link href="/blog">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                                </Link>
                            </Button>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{post.author}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                {post.title}
                            </h1>

                            <div className="prose prose-slate max-w-none">
                                <p className="lead text-xl text-slate-600 mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="text-slate-700 leading-relaxed space-y-4">
                                    {/* Simulating rich text content */}
                                    <p>{post.content}</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <h3>Key Takeaways</h3>
                                    <ul>
                                        <li>Understanding the basics is crucial.</li>
                                        <li>Consulting with healthcare professionals is recommended.</li>
                                        <li>Regular check-ups can prevent long-term issues.</li>
                                    </ul>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <BlogSidebar />
                    </aside>
                </div>
            </Container>
        </div>
    )
}
