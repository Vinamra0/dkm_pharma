import ProductForm from '@/components/ProductForm'
import Link from 'next/link'

export default function CreateProductPage() {
    return (
        <main className="content-section">
            <div className="container">
                <div className="breadcrumb-area" style={{ backgroundColor: 'transparent', padding: '0 0 20px 0' }}>
                    <ul className="breadcrumb">
                        <li><Link href="/admin">Admin</Link></li>
                        <li>Add Product</li>
                    </ul>
                </div>

                <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Add New Product</h1>
                <ProductForm />
            </div>
        </main>
    )
}
