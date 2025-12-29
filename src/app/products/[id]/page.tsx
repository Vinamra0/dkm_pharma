import { notFound } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
    let product: any = null
    try {
        const res = await fetch(`${base}/api/products/${id}`, { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (json?.data) product = json.data
        }
    } catch (e) {
        // ignore
    }
    if (!product) notFound()

    // Ensure the product always has a `specifications` object expected by the UI
    product = {
        ...product,
        specifications: product.specifications || {
            composition: product.composition || '',
            dosageForm: product.dosageForm || '',
            packaging: product.packing || product.packageType || ''
        },
        image: product.image || '/assets/products/sample-paracetamol.svg'
    }

    return (
        <div className="bg-white min-h-screen py-12">
            <Container>
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all" asChild>
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                    </Link>
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="rounded-xl overflow-hidden bg-slate-100 border h-[400px] md:h-[500px] relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{product.name}</h1>
                            <p className="text-xl text-slate-600">{product.description}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                            <dl className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-slate-500">Composition</dt>
                                    <dd className="text-sm text-slate-900 col-span-2">{product.specifications.composition}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-slate-500">Dosage Form</dt>
                                    <dd className="text-sm text-slate-900 col-span-2">{product.specifications.dosageForm}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-slate-500">Packaging</dt>
                                    <dd className="text-sm text-slate-900 col-span-2">{product.specifications.packaging}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Key Benefits</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-slate-700">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>High efficacy and safety profile</span>
                                </li>
                                <li className="flex items-center gap-2 text-slate-700">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>Manufactured in WHO-GMP certified facilities</span>
                                </li>
                                <li className="flex items-center gap-2 text-slate-700">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>Affordable pricing</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t">
                            <Button size="lg" className="w-full md:w-auto">
                                Enquire About This Product
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
