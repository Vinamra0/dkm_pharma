"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

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
    }
]

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 py-20 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Gallery</h1>
                        <p className="text-xl text-slate-300">
                            A glimpse into the life, culture, and facilities at DK Medi Group.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Gallery Grid */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-md group-hover:shadow-xl transition-all duration-300 bg-slate-100">
                                    <motion.img
                                        layoutId={`image-${image.id}`}
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <div className="relative max-w-7xl w-full max-h-[90vh] aspect-auto z-10 flex items-center justify-center pointer-events-none">
                            <motion.img
                                layoutId={`image-${selectedImage.id}`}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                transition={{ type: "spring", stiffness: 200, damping: 28 }}
                                className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain pointer-events-auto"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors pointer-events-auto bg-black/50 p-2 rounded-full md:bg-transparent"
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
