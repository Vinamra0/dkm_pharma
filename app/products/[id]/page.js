import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function ProductDetail({ params }) {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!product) {
        return (
            <main className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <h1>Product Not Found</h1>
                <Link href="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Products</Link>
            </main>
        )
    }

    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li>{product.name}</li>
                    </ul>
                </div>
            </div>

            <section className="product-detail">
                <div className="container product-detail-grid">
                    <div className="product-gallery">
                        <div className="main-image">
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                    </div>
                    <div className="product-info">
                        <span className="sku-badge">SKU: DKM-{product.id + 1000}</span>
                        <h1>{product.name}</h1>
                        <p className="category">Category: {product.therapeuticCat}</p>

                        <div className="description">
                            <h3>Product Details</h3>
                            <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                                <li style={{ marginBottom: '10px' }}><strong>Dosage Form:</strong> {product.dosageForm}</li>
                                <li style={{ marginBottom: '10px' }}><strong>Strength:</strong> {product.strength}</li>
                                <li style={{ marginBottom: '10px' }}><strong>Manufacturer:</strong> {product.manufacturer}</li>
                                <li style={{ marginBottom: '10px' }}><strong>Packaging:</strong> {product.packaging}</li>
                                <li style={{ marginBottom: '10px' }}>
                                    <strong>Availability:</strong>
                                    {product.availability ? (
                                        <span style={{ color: 'green', marginLeft: '5px' }}>In Stock</span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '5px' }}>Out of Stock</span>
                                    )}
                                </li>
                            </ul>

                            <h3>Description</h3>
                            <p>High-quality pharmaceutical product manufactured under strict GMP guidelines. Designed for optimal efficacy and patient safety.</p>
                        </div>

                        <div className="product-actions">
                            <a href="/contact" className="btn btn-primary">Enquire Now</a>
                            <button className="btn btn-outline"><i className="fa-solid fa-download"></i> Download Spec Sheet</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
