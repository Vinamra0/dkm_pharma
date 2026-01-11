"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ApplicationForm from "@/components/forms/ApplicationForm"

export default function ApplyButton({ job }: { job: any }) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Apply Now</Button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
                    <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Apply for: {job.title}</h3>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
                        </div>
                        <ApplicationForm jobId={job.id} jobTitle={job.title} onClose={() => setOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}
