import Link from "next/link"
import { Container } from "@/components/ui/container"
import { BlogSidebar } from "@/components/blog/BlogSidebar"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest News & Articles</h1>

                        {blogPosts.map((post) => (
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
                        ))}
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
