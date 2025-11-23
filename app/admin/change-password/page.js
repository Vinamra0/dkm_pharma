'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChangePasswordPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
    const [message, setMessage] = useState({ type: '', text: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' })
            return
        }

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            })

            if (res.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully' })
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                const data = await res.json()
                setMessage({ type: 'error', text: data.error || 'Failed to update password' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="content-section">
            <div className="container">
                <div className="breadcrumb-area" style={{ backgroundColor: 'transparent', padding: '0 0 20px 0' }}>
                    <ul className="breadcrumb">
                        <li><Link href="/admin">Admin</Link></li>
                        <li>Change Password</li>
                    </ul>
                </div>

                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Change Password</h1>

                    {message.text && (
                        <div style={{
                            background: message.type === 'error' ? '#ffebee' : '#e8f5e9',
                            color: message.type === 'error' ? '#c62828' : '#2e7d32',
                            padding: '15px',
                            borderRadius: '6px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Current Password</label>
                            <input
                                type="password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                required
                                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>New Password</label>
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                required
                                minLength={6}
                                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Confirm New Password</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ flex: 1 }}
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                            <Link href="/admin" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
