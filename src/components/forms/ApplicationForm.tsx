"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { UploadCloud } from "lucide-react"
import { sendApplication } from "@/lib/client/sendApplication"

export default function ApplicationForm({ jobId, jobTitle, onClose }: { jobId?: string; jobTitle?: string; onClose?: () => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [education, setEducation] = useState("")
    const [experience, setExperience] = useState("")
    const [location, setLocation] = useState("")
    const [coverLetter, setCoverLetter] = useState("")
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setMessage(null)
        if (!name || !email) {
            setMessage("Please fill name and email.")
            return
        }
        if (!cvFile) {
            setMessage("Please upload your CV.")
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phone", phone)
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
                    <label className="text-sm text-slate-700">Contact Number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2" />
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
