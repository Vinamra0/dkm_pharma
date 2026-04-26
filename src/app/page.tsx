"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
// no local fallback; fetch posts from backend
import { motion } from "framer-motion"
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection"
import { CompaniesSection } from "@/components/home/CompaniesSection"
import { GallerySection } from "@/components/home/GallerySection"
import { ProductShowcase } from "@/components/home/ProductShowcase"
import { useEffect, useState } from "react"
import { PharmaHeroBackground } from "@/components/home/PharmaHeroBackground"

export default function Home() {
  const [posts, setPosts] = useState<Array<{ id: string; title: string; excerpt: string; author: string; date: string; image: string; category: string; slug: string }>>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
        const res = await fetch(`${base}/api/blogs`, { cache: 'no-store' })
        if (res.ok) {
          const json = await res.json()
          if (Array.isArray(json?.data) && mounted) {
            const mapped = json.data.map((b: { _id?: string; id?: string; slug?: string; title?: string; excerpt?: string; content?: string; author?: string; createdAt?: string; date?: string; image?: string; category?: string }) => ({
              id: b._id || b.id || b.slug,
              title: b.title || 'Untitled',
              excerpt: b.excerpt || (b.content || '').slice(0,150),
              author: b.author || 'DKM Team',
              date: b.createdAt ? new Date(b.createdAt).toISOString().slice(0,10) : (b.date || ''),
              image: b.image || '/assets/blog-default.jpg',
              category: b.category || 'General',
              slug: b.slug || (b._id || '')
            }))
            setPosts(mapped)
          }
        }
      } catch {
        // on error keep posts empty
      }
    }
    load()
    return () => { mounted = false }
  }, [])
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <div className="home-ambient-bg" aria-hidden="true" />
      <div className="home-grid-overlay" aria-hidden="true" />
      <div className="home-gradient-sweep" aria-hidden="true" />
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative bg-slate-950 py-24 md:py-36 overflow-hidden">
        <PharmaHeroBackground />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
              Advancing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Healthcare Access</span> <br />
              Across Nepal
            </h1>
            <p className="text-xl text-slate-300 md:text-2xl leading-relaxed max-w-2xl">
              DK Medi Group delivers high-quality pharmaceutical products, medical devices, and healthcare solutions through global partnerships, making advanced treatment accessible and affordable.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" variant="premium" className="h-14 px-8 text-lg" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* About Preview */}
      <section className="py-16 md:py-20 bg-white/32">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg opacity-90">Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                  Who We Are
                </h4>
                <div className="relative inline-block mb-6">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">About Us</h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full origin-left"
                  />
                </div>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                DK Medi Group (DKM) is a healthcare-focused organization dedicated to improving access to high-quality medical products and services across Nepal. Since 1998, DKM has been actively engaged in pharmaceutical distribution, collaborating with leading international and multinational healthcare companies.
              </p>
              <ul className="space-y-4">
                {[
                  "Nationwide distribution network",
                  "Experienced sales and marketing team",
                  "Efficient delivery to hospitals, clinics, and patients"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant="default" className="px-8" asChild>
                <Link href="/about">Read Our Story <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Companies Section */}
      <CompaniesSection />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Latest Blog Posts */}
      <section className="py-16 md:py-20 bg-white/34">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h4 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                Updates
              </h4>
              <div className="relative inline-block mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Latest News & Insights</h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full origin-left"
                />
              </div>
              <p className="text-slate-600 mt-2">Stay updated with the latest trends in healthcare.</p>
            </div>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="surface-card rounded-3xl overflow-hidden shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-shadow duration-300 group"
              >
                <div className="h-64 bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${post.image})` }} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-blue-600 shadow-sm uppercase">
                    {post.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 font-bold tracking-wide pt-6 border-t border-slate-50 uppercase">
                    <span>{post.date}</span>
                    <span className="mx-2 text-blue-200">•</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <GallerySection />
      </div>
    </div>
  )
}
