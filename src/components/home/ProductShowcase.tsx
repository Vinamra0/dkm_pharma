"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { API_BASE, resolveImageUrl } from "@/lib/api-base"

export function ProductShowcase() {
    const [products, setProducts] = useState<Array<{ id: string; name: string; category: string; description: string; image: string }>>([])

    useEffect(() => {
        let mounted = true
        async function load() {
            try {
                const res = await fetch(`${API_BASE}/api/products`, { cache: 'no-store' })
                if (res.ok) {
                    const json = await res.json()
                    if (Array.isArray(json?.data) && mounted) {
                        const mapped = json.data.map((p: { _id?: string; id?: string; name?: string; category?: string; composition?: string; description?: string; image?: string; imageUrl?: string }) => ({
                            id: p._id || p.id,
                            name: p.name || 'Untitled',
                            category: p.category || 'General',
                            description: p.composition || p.description || '',
                            image: resolveImageUrl(p.image ?? p.imageUrl)
                        }))
                        setProducts(mapped)
                    }
                }
            } catch {
                // on error keep products empty
            }
        }
        load()
        return () => { mounted = false }
    }, [])

    // Get first 4 products for showcase
    const featuredProducts = products.slice(0, 4)

    return (
        <section className="py-16 md:py-20 bg-white/30">
            <Container>
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h4 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                            Key Product Segments
                        </h4>
                        <div className="relative inline-block mb-4">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Comprehensive Healthcare Solutions</h2>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full origin-left"
                            />
                        </div>
                        <p className="text-slate-600 mt-2">IV fluids, oncology and critical care medicines, dialysis tools, surgical consumables, and clinical nutrition solutions.</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                        <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="surface-card rounded-3xl overflow-hidden shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300 group flex flex-col"
                        >
                            <div className="h-64 bg-slate-100 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-blue-600 shadow-sm uppercase">
                                    {product.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    <Link href={`/products/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                                    {product.description}
                                </p>
                                <div className="pt-4 border-t border-slate-50">
                                    <Button
                                        variant="outline"
                                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                                        asChild
                                    >
                                        <Link href={`/products/${product.id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
