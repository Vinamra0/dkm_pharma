import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import ApplyButton from "@/components/career/ApplyButton"
import { Briefcase, MapPin, Clock } from "lucide-react"
import { getPublicCareers } from '@/lib/career-data'

export default async function CareerPage() {
    const jobs = await getPublicCareers();

    return (
        <div className="min-h-screen page-surface py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">
                        Join Our Team
                    </h1>
                    <p className="text-lg text-slate-600">
                        At DK Medi Group, we believe that our people are our greatest asset. Explore exciting career opportunities and be part of a dynamic team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {jobs.map((job) => (
                        <div key={job.id} className="surface-card p-6 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{job.department}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <p className="text-slate-600">{job.description}</p>
                            </div>
                            <ApplyButton job={job} />
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center surface-card p-8 rounded-lg border max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4">Don&apos;t see a matching role?</h3>
                    <p className="text-slate-600 mb-6">
                        We are always looking for talented individuals. Send your CV to our HR department, and we will contact you when a suitable position opens up.
                    </p>
                    <Button variant="outline">Email Your CV</Button>
                </div>
            </Container>
        </div>
    )
}
