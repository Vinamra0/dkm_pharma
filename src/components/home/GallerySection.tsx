"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

const galleryImages = [
    {
        id: 1,
        src: "/gallery/team_meeting.png",
        alt: "Strategic Planning",
        category: "Office Life"
    },
    {
        id: 2,
        src: "/gallery/modern_lab.png",
        alt: "Advanced Research Lab",
        category: "Research & Development"
    },
    {
        id: 3,
        src: "/gallery/warehouse.png",
        alt: "Distribution Center",
        category: "Operations"
    },
    {
        id: 4,
        src: "/gallery/team_collaboration.png",
        alt: "Team Collaboration",
        category: "Our People"
    },
    {
        id: 5,
        src: "/gallery/corporate_event.png",
        alt: "Annual Forum",
        category: "Events"
    },
    {
        id: 6,
        src: "/gallery/award_ceremony.png",
        alt: "Excellence Awards",
        category: "Achievements"
    },
    {
        id: 7,
        src: "/gallery/innovation_hub.png",
        alt: "Innovation Hub",
        category: "Research & Development"
    },
    {
        id: 8,
        src: "/gallery/office_lobby.png",
        alt: "Corporate Headquarters",
        category: "Office Life"
    },
    {
        id: 9,
        src: "/gallery/logistics_center.png",
        alt: "Global Logistics",
        category: "Operations"
    },
    {
        id: 10,
        src: "/gallery/thumb_192.jpg",
        alt: "Gallery Image 192",
        category: "Office Life"
    }
]

export function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextSlide = () => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000) // Auto-advance every 5 seconds

        return () => clearInterval(timer)
    }, [currentIndex])

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    return (
        <section className="py-14 md:py-16 bg-white/30">
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                            Our Journey
                        </h4>
                        <div className="relative inline-block mb-4">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Gallery</h2>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute bottom-0 left-0 w-2/3 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent rounded-full origin-left"
                            />
                        </div>
                        <p className="text-slate-600 mt-2">A glimpse into the life and culture at DK Medi Group.</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                        <Link href="/gallery">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>

                {/* Slideshow Container */}
                <div className="relative">
                    {/* Main Slideshow */}
                    <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={galleryImages[currentIndex].src}
                                    alt={galleryImages[currentIndex].alt}
                                    fill
                                    priority
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6 text-slate-900" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6 text-slate-900" />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
