"use client";

import { Container } from "@/components/ui/container"
import { CheckCircle2, Target, Heart, Award, ArrowRight, ShieldCheck, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 py-20 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About DK Medi Group</h1>
                        <p className="text-xl text-slate-300">
                            Pioneering pharmaceutical excellence with a commitment to global health and wellness.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <Container>
                    {/* Shared Gradient Definition */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-white p-10 rounded-3xl shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8"
                            >
                                <Target className="h-8 w-8" stroke="url(#brand-gradient)" />
                            </motion.div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To provide high-quality, affordable, and accessible medicines to people around the world. We strive to improve the quality of life by ensuring that essential healthcare solutions are within reach of every individual.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-white p-10 rounded-3xl shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8"
                            >
                                <Heart className="h-8 w-8" stroke="url(#brand-gradient)" />
                            </motion.div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To be a global leader in the pharmaceutical industry, recognized for our innovation, quality, and ethical business practices. We aim to set new standards in healthcare delivery and patient safety.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Company Overview */}
            {/* Company Overview */}
            <section className="py-16 bg-slate-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-sm font-bold tracking-widest text-[#2563eb] uppercase mb-2">
                                    About DK Medi Group
                                </h4>
                                <div className="relative inline-block">
                                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Our Journey</h2>
                                    <div className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-600 leading-relaxed">
                                    Established in 1998, DK Medi Group has evolved from a visionary startup into a leading conglomerate in the pharmaceutical sector. As a Group of Companies, we have diversified our expertise to cover various aspects of healthcare, from importing and marketing to distribution.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    Our commitment to quality is unwavering. We collaborate with international and multinational companies to bring world-class pharmaceutical products to the local market. We adhere to strict international standards to ensure that every product we handle is safe, effective, and reliable.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-2">
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5" stroke="url(#brand-gradient)" />
                                    <span className="font-medium text-slate-800">ISO Certified</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5" stroke="url(#brand-gradient)" />
                                    <span className="font-medium text-slate-800">WHO-GMP Compliant</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5" stroke="url(#brand-gradient)" />
                                    <span className="font-medium text-slate-800">20+ Years Experience</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5" stroke="url(#brand-gradient)" />
                                    <span className="font-medium text-slate-800">Global Presence</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[400px] rounded-xl overflow-hidden bg-slate-200 relative">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800')" }} />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <div className="inline-block relative">
                            <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Integrity", desc: "We conduct our business with the highest ethical standards." },
                            { title: "Innovation", desc: "We constantly seek new ways to improve healthcare solutions." },
                            { title: "Quality", desc: "We never compromise on the safety and efficacy of our products." },
                            { title: "Customer Focus", desc: "We put the needs of patients and healthcare providers first." },
                            { title: "Sustainability", desc: "We are committed to environmentally responsible practices." },
                            { title: "Teamwork", desc: "We believe in the power of collaboration and mutual respect." },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-8 bg-white rounded-2xl shadow-sm shadow-blue-50/50 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.15)] transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Life at DK Medi Group */}
            <section className="py-16 bg-slate-50">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h4 className="text-sm font-bold tracking-widest text-[#2563eb] uppercase mb-2">
                                Our Culture
                            </h4>
                            <div className="relative inline-block mb-4">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Life at DK Medi Group</h2>
                                <div className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full" />
                            </div>
                            <p className="text-slate-600 max-w-2xl mt-2">
                                We&apos;re more than just a company; we&apos;re a community of passionate individuals working together to make a difference.
                            </p>
                        </div>
                        <Link href="/gallery">
                            <Button className="gap-2">
                                View Full Gallery
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { src: "/gallery/team_meeting.png", alt: "Team Meeting" },
                            { src: "/gallery/modern_lab.png", alt: "Research Lab" },
                            { src: "/gallery/team_collaboration.png", alt: "Team Collaboration" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="group rounded-3xl overflow-hidden shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300"
                            >
                                <div className="h-72 overflow-hidden bg-slate-100">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
