'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductForm({ initialData = {} }) {
    const router = useRouter()
    const isEdit = !!initialData.id
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        therapeuticCat: initialData.therapeuticCat || '',
        dosageForm: initialData.dosageForm || '',
        strength: initialData.strength || '',
        manufacturer: initialData.manufacturer || '',
        packaging: initialData.packaging || '',
        availability: initialData.availability ?? true,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const url = isEdit ? `/api/products/${initialData.id}` : '/api/products'
        const method = isEdit ? 'PUT' : 'POST'

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                router.push('/admin')
                router.refresh()
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.error(error)
            alert('Error saving product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="product-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Therapeutic Category</label>
                <select
                    name="therapeuticCat"
                    value={formData.therapeuticCat}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                >
                    <option value="">Select Category</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Analgesics">Analgesics</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Vitamins">Vitamins</option>
                </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Dosage Form</label>
                <select
                    name="dosageForm"
                    value={formData.dosageForm}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                >
                    <option value="">Select Dosage Form</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Ointment">Ointment</option>
                </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Strength</label>
                <input
                    type="text"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                    placeholder="e.g. 500mg"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Manufacturer</label>
                <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Packaging</label>
                <input
                    type="text"
                    name="packaging"
                    value={formData.packaging}
                    onChange={handleChange}
                    placeholder="e.g. 10x10 Box"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleChange}
                    />
                    Available in Stock
                </label>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '15px' }}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ flex: 1 }}
                >
                    {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                </button>
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => router.back()}
                    style={{ flex: 1 }}
                >
                    Cancel
                </button>
            </div>
        </form >
    )
}
