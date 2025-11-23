import ProductForm from '@/components/ProductForm'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function EditProductPage({ params }) {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!product) {
        return <div className="container">Product not found</div>
    }

    return (
        <main className="content-section">
            <div className="container">
                <div className="breadcrumb-area" style={{ backgroundColor: 'transparent', padding: '0 0 20px 0' }}>
                    <ul className="breadcrumb">
                        <li><Link href="/admin">Admin</Link></li>
                        <li>Edit Product</li>
                    </ul>
                </div>

                <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Edit Product</h1>
                <ProductForm initialData={product} />
            </div>
        </main>
    )
}
