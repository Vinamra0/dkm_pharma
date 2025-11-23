import Link from 'next/link'
import prisma from '@/lib/prisma'

// Force dynamic rendering for search params
export const dynamic = 'force-dynamic'

async function getProducts(searchParams) {
    const category = searchParams.category
    const search = searchParams.search
    const dosageForm = searchParams.dosageForm

    const where = {}

    if (category && category !== 'All') {
        where.therapeuticCat = category
    }

    if (dosageForm && dosageForm !== 'All') {
        where.dosageForm = dosageForm
    }

    if (search) {
        where.name = {
            contains: search,
        }
    }

    const products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    })
    return products
}

export default async function Products({ searchParams }) {
    const products = await getProducts(searchParams)

    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Products</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>Our Products</h1>
                    <p className="lead">Explore our wide range of pharmaceutical solutions.</p>

                    <div className="products-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
                        {/* Sidebar Filters */}
                        <aside className="filters">
                            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Filters</h3>

                                <form>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Search</label>
                                        <input
                                            type="text"
                                            name="search"
                                            defaultValue={searchParams.search}
                                            placeholder="Product name..."
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Category</label>
                                        <select
                                            name="category"
                                            defaultValue={searchParams.category}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                                        >
                                            <option value="All">All Categories</option>
                                            <option value="Antibiotics">Antibiotics</option>
                                            <option value="Analgesics">Analgesics</option>
                                            <option value="Respiratory">Respiratory</option>
                                            <option value="Diabetes">Diabetes</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Vitamins">Vitamins</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Dosage Form</label>
                                        <select
                                            name="dosageForm"
                                            defaultValue={searchParams.dosageForm}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                                        >
                                            <option value="All">All Forms</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Capsule">Capsule</option>
                                            <option value="Syrup">Syrup</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Ointment">Ointment</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Apply Filters</button>
                                    <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '10px', fontSize: '14px', color: 'var(--light-text)' }}>Clear Filters</Link>
                                </form>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="products-grid-page">
                            {products.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '12px' }}>
                                    <p>No products found matching your criteria.</p>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <div key={product.id} className="featured-card">
                                        <div className="product-image-placeholder">
                                            <i className="fa-solid fa-box-open"></i>
                                        </div>
                                        <div className="product-details">
                                            <h3>{product.name}</h3>
                                            <p className="product-type">{product.therapeuticCat}</p>
                                            <p className="product-category">{product.dosageForm} - {product.strength}</p>
                                        </div>
                                        <div className="product-action">
                                            <Link href={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
