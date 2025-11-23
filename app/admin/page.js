import Link from 'next/link'
import prisma from '@/lib/prisma'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

async function getProducts() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return products
}

export default async function AdminDashboard() {
    const products = await getProducts()

    return (
        <main className="content-section">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1>Product Management</h1>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link href="/admin/change-password" className="btn btn-outline">
                            <i className="fa-solid fa-key"></i> Change Password
                        </Link>
                        <Link href="/admin/create" className="btn btn-primary">
                            <i className="fa-solid fa-plus"></i> Add New Product
                        </Link>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>ID</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>Name</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>Category</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>Form</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: 'var(--light-text)' }}>
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '15px' }}>#{product.id}</td>
                                        <td style={{ padding: '15px', fontWeight: '500' }}>{product.name}</td>
                                        <td style={{ padding: '15px' }}>{product.therapeuticCat}</td>
                                        <td style={{ padding: '15px' }}>{product.dosageForm}</td>
                                        <td style={{ padding: '15px' }}>
                                            {product.availability ? (
                                                <span style={{ color: 'green', fontWeight: '500' }}>In Stock</span>
                                            ) : (
                                                <span style={{ color: 'red', fontWeight: '500' }}>Out of Stock</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Link href={`/admin/${product.id}/edit`} style={{ color: 'var(--primary-color)' }}>
                                                    <i className="fa-solid fa-pen-to-square"></i> Edit
                                                </Link>
                                                {/* Delete button would ideally be a client component or form action */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
