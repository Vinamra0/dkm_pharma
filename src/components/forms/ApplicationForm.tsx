"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { UploadCloud, AlertCircle } from "lucide-react"
import { sendApplication } from "@/lib/client/sendApplication"

const STD_CODES = [
    { code: '+977', country: 'Nepal' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+61', country: 'Australia' },
]

export default function ApplicationForm({ jobId, onClose }: { jobId?: string; onClose?: () => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [stdCode, setStdCode] = useState("+977")
    const [education, setEducation] = useState("")
    const [experience, setExperience] = useState("")
    const [location, setLocation] = useState("")
    const [coverLetter, setCoverLetter] = useState("")
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [phoneError, setPhoneError] = useState("")
    const fileRef = useRef<HTMLInputElement | null>(null)

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    const allowedMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null
        if (!f) {
            setCvFile(null)
            return
        }
        if (!allowedMimes.includes(f.type)) {
            setMessage("Invalid file type. Please upload PDF, DOC or DOCX.")
            e.target.value = ""
            return
        }
        if (f.size > MAX_SIZE) {
            setMessage("File too large. Max 10MB allowed.")
            e.target.value = ""
            return
        }
        setMessage(null)
        setCvFile(f)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
        setPhone(value)
        setPhoneError("")
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setMessage(null)
        
        if (!name || !email) {
            setMessage("Please fill name and email.")
            return
        }

        if (phone && !/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
            setPhoneError("Phone number must be exactly 10 digits")
            return
        }

        if (!cvFile) {
            setMessage("Please upload your CV.")
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phone", phone ? `${stdCode}-${phone}` : "")
        formData.append("education", education)
        formData.append("experience", experience)
        formData.append("location", location)
        formData.append("coverLetter", coverLetter)
        if (jobId) formData.append("jobId", String(jobId))
        formData.append("cv", cvFile)

        try {
            setIsSubmitting(true)
            const res = await sendApplication(formData)
            if (res.ok && res.body && res.body.success) {
                setMessage("Application submitted — thank you!")
                // optional: clear form
                setName("")
                setEmail("")
                setPhone("")
                setStdCode("+977")
                setEducation("")
                setExperience("")
                setLocation("")
                setCoverLetter("")
                setCvFile(null)
                if (fileRef.current) fileRef.current.value = ""
                if (onClose) setTimeout(onClose, 1200)
            } else {
                setMessage(res.body?.message || "Failed to submit application")
            }
        } catch (err) {
            console.error(err)
            setMessage("Failed to submit application")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-slate-700">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="text-sm text-slate-700">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="text-sm text-slate-700">STD Code</label>
                    <select value={stdCode} onChange={(e) => setStdCode(e.target.value)} className="w-full border rounded px-3 py-2">
                        {STD_CODES.map((std) => (
                            <option key={std.code} value={std.code}>
                                {std.code} ({std.country})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm text-slate-700">Contact Number (10 digits)</label>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-medium">{stdCode}-</span>
                        <div className="flex-1 relative">
                            <input 
                                value={phone} 
                                onChange={handlePhoneChange} 
                                maxLength={10}
                                placeholder="5386780"
                                className={`w-full border rounded px-3 py-2 font-mono ${phoneError ? 'border-red-400' : ''}`} 
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                                {phone.length}/10
                            </span>
                        </div>
                    </div>
                    {phoneError && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-4 w-4" /> {phoneError}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-sm text-slate-700">Educational Qualification</label>
                    <input value={education} onChange={(e) => setEducation(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm text-slate-700">Experience (If Any)</label>
                    <input value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="text-sm text-slate-700">Current Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="text-sm text-slate-700 flex items-center gap-2">
                        <button type="button" onClick={() => fileRef.current?.click()} aria-label="Upload resume" className="p-2 rounded border hover:bg-slate-50">
                            <UploadCloud className="h-5 w-5 text-slate-700" />
                        </button>
                        <span className="text-sm text-slate-700">{cvFile ? cvFile.name : ''}</span>
                    </label>
                    <input ref={fileRef} onChange={handleFile} accept=".pdf,.doc,.docx" type="file" className="hidden" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm text-slate-700">Cover Letter (optional)</label>
                    <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full border rounded px-3 py-2 h-28" />
                </div>
            </div>

            {message && <div className="text-sm text-slate-700">{message}</div>}

            <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Information'}</Button>
            </div>
        </form>
    )
}
