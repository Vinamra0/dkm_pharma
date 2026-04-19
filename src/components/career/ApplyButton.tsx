import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApplyButton({ job }: { job: { id?: string; title?: string } }) {
    const href = `/career/apply/${encodeURIComponent(job.id || 'open-position')}${job.title ? `?title=${encodeURIComponent(job.title)}` : ''}`

    return (
        <Button asChild>
            <Link href={href}>Apply Now</Link>
        </Button>
    )
}
