"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type ImageItem = {
    id: string
    src: string
    alt?: string
}

export default function GalleryClient({ images }: { images: ImageItem[] }) {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className="group cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                    >
                        <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-md group-hover:shadow-xl transition-all duration-300 bg-slate-100">
                            <motion.img
                                layoutId={`image-${image.id}`}
                                src={image.src}
                                alt={image.alt || "gallery image"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

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
