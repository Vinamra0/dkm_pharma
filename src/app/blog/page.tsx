import Link from "next/link"
import { Container } from "@/components/ui/container"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
// fetch posts from backend only
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>
}) {
    const params = await searchParams
    // Fetch posts from backend
    let fetchedPosts: any[] = []
    try {
        const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
        const res = await fetch(`${base}/api/blogs`, { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (Array.isArray(json?.data)) fetchedPosts = json.data.map((b: any) => ({
                id: b._id || b.id || b.slug,
                title: b.title,
                excerpt: b.excerpt || (b.content || '').slice(0, 150),
                content: b.content,
                author: b.author || 'DKM Team',
                date: b.createdAt ? new Date(b.createdAt).toISOString().slice(0,10) : (b.date || ''),
                image: b.image || '/assets/blog-default.jpg',
                category: b.category || 'General',
                slug: b.slug || (b._id || '')
            }))
        }
    } catch (e) {
        // on error, fetchedPosts remains empty
    }

    let filteredPosts = fetchedPosts

    // Filter by category
    if (params.category) {
        filteredPosts = filteredPosts.filter((post) => post.category === params.category)
    }

    // Filter by search term
    if (params.search) {
        const searchLower = params.search.toLowerCase()
        filteredPosts = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.category.toLowerCase().includes(searchLower)
        )
    }

    // Sort by date (latest first)
    filteredPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl font-bold tracking-tight">Latest News & Articles</h1>
                                {(params.category || params.search) && (
                                    <Button variant="outline" asChild>
                                        <Link href="/blog">Reset Filters</Link>
                                    </Button>
                                )}
                            </div>
                            {params.category && (
                                <p className="text-slate-600">
                                    Showing posts in <span className="font-semibold text-primary">{params.category}</span>
                                </p>
                            )}
                            {params.search && (
                                <p className="text-slate-600">
                                    Search results for <span className="font-semibold text-primary">"{params.search}"</span>
                                </p>
                            )}
                        </div>

                        {filteredPosts.length === 0 ? (
                            <div className="bg-white rounded-lg p-8 text-center">
                                <p className="text-slate-600">No posts found in this category.</p>
                                <Button variant="link" asChild className="mt-4">
                                    <Link href="/blog">View all posts</Link>
                                </Button>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border flex flex-col md:flex-row">
                                <div className="md:w-1/3 h-48 md:h-auto bg-slate-200 relative">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                                </div>
                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                                            <span>{post.category}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-500">{post.date}</span>
                                        </div>
                                        <h2 className="text-xl font-bold mb-3">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="text-slate-600 mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <Button variant="link" className="p-0 h-auto self-start text-primary" asChild>
                                        <Link href={`/blog/${post.slug}`}>
                                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </article>
                            ))
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <BlogSidebar />
                    </aside>
                </div>
            </Container>
        </div>
    )
}
