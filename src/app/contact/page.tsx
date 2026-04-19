'use client'

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, AlertCircle } from "lucide-react"
import { useState } from "react"

interface FormData {
    name: string
    email: string
    phone: string
    stdCode: string
    subject: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
    stdCode?: string
    subject?: string
    message?: string
}

const STD_CODES = [
    { code: '+977', country: 'Nepal' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+61', country: 'Australia' },
]

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        stdCode: '+977',
        subject: '',
        message: '',
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [submitted, setSubmitted] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.stdCode.trim()) {
            newErrors.stdCode = 'STD code is required'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone number must be exactly 10 digits'
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
        setFormData(prev => ({ ...prev, phone: value }))
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateForm()) {
            console.log('Form submitted:', {
                ...formData,
                fullPhone: `${formData.stdCode}-${formData.phone}`
            })
            setSubmitted(true)
            setFormData({
                name: '',
                email: '',
                phone: '',
                stdCode: '+977',
                subject: '',
                message: '',
            })
            setTimeout(() => setSubmitted(false), 5000)
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-600">
                        Have questions or need assistance? We are here to help. Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Head Office</h4>
                                        <p className="text-slate-600 mt-1 text-sm">
                                            DKM Group, D K M House (Tinkune Marg-82),<br />
                                            Kuleshwor Height, Naya Basti,<br />
                                            Kuleshwor, Kathmandu, Nepal
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Phone</h4>
                                        <p className="text-slate-600 mt-1 text-sm">01-5386780, 01-5378441</p>
                                        <p className="text-slate-600 text-sm">01-5386749, 01-5374678</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Email</h4>
                                        <p className="text-slate-600 mt-1 text-sm">dkmedisales@gmail.com</p>
                                        <p className="text-slate-600 text-sm">ceo@dkmedigroup.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-lg shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>

                            {submitted && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                    <p className="text-green-700 font-medium">✓ Message sent successfully!</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, name: e.target.value }))
                                                if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                                            }}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" /> {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, email: e.target.value }))
                                                if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                                            }}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" /> {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="stdCode" className="text-sm font-medium text-slate-700">STD Code</label>
                                        <select
                                            id="stdCode"
                                            value={formData.stdCode}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, stdCode: e.target.value }))
                                                if (errors.stdCode) setErrors(prev => ({ ...prev, stdCode: '' }))
                                            }}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.stdCode ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                        >
                                            {STD_CODES.map((std) => (
                                                <option key={std.code} value={std.code}>
                                                    {std.code} ({std.country})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.stdCode && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" /> {errors.stdCode}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number (10 digits)</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-600 font-medium">{formData.stdCode}-</span>
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                maxLength={10}
                                                className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-mono ${errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                                placeholder="5386780"
                                            />
                                            <span className="text-sm text-slate-500">
                                                {formData.phone.length}/10
                                            </span>
                                        </div>
                                        {errors.phone && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" /> {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, subject: e.target.value }))
                                            if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }))
                                        }}
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.subject ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                        placeholder="Inquiry about..."
                                    />
                                    {errors.subject && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" /> {errors.subject}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, message: e.target.value }))
                                            if (errors.message) setErrors(prev => ({ ...prev, message: '' }))
                                        }}
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.message ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-primary/50'}`}
                                        placeholder="Your message here..."
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" /> {errors.message}
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" size="lg" className="w-full md:w-auto">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
