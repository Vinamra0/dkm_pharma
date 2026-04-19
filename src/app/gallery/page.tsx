import fs from "fs/promises"
import path from "path"
import { Container } from "@/components/ui/container"
import GalleryClient from "@/components/gallery/GalleryClient"

type ImageItem = {
    id: string
    src: string
    alt?: string
}

async function getGalleryImages(): Promise<ImageItem[]> {
    const galleryDir = path.join(process.cwd(), "public", "gallery")
    try {
        const files = await fs.readdir(galleryDir)
        return files
            .filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
            .map((f, i) => ({
                id: String(i),
                src: `/gallery/${encodeURIComponent(f)}`,
                alt: f.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
            }))
    } catch {
        return []
    }
}

export default async function GalleryPage() {
    const images = await getGalleryImages()

    return (
        <div className="bg-white min-h-screen">
            <section className="bg-slate-900 py-20 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Gallery</span>
                        </h1>
                        <p className="text-xl text-slate-300">A glimpse into the life, culture, and facilities at DK Medi Group.</p>
                    </div>
                </Container>
            </section>

            <section className="py-20 bg-white">
                <Container>
                    <GalleryClient images={images} />
                </Container>
            </section>
        </div>
    )
}
