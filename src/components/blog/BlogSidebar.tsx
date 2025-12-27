"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

export function BlogSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const search = searchParams.get("search")
        if (search) {
            setSearchTerm(search)
        }
    }, [searchParams])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        
        if (value.trim()) {
            router.push(`/blog?search=${encodeURIComponent(value)}`)
        } else {
            router.push("/blog")
        }
    }

    const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
    const recentPosts = [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)

    return (
        <div className="space-y-8">
            {/* Search Widget */}
            <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
            </div>

            {/* Categories Widget */}
            <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category}>
                            <Link
                                href={`/blog?category=${category}`}
                                className="text-slate-600 hover:text-primary transition-colors flex justify-between items-center"
                            >
                                <span>{category}</span>
                                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                                    {blogPosts.filter((p) => p.category === category).length}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                    {recentPosts.map((post) => (
                        <li key={post.id} className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-200">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium line-clamp-2 leading-snug mb-1">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </h4>
                                <span className="text-xs text-slate-500">{post.date}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
