import { Container } from "@/components/ui/container"
import { CheckCircle2, Target, Heart, Award } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 py-20 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About DK Medi Group</h1>
                        <p className="text-xl text-slate-300">
                            Pioneering pharmaceutical excellence with a commitment to global health and wellness.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-slate-50 p-8 rounded-lg border">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To provide high-quality, affordable, and accessible medicines to people around the world. We strive to improve the quality of life by ensuring that essential healthcare solutions are within reach of every individual.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-lg border">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To be a global leader in the pharmaceutical industry, recognized for our innovation, quality, and ethical business practices. We aim to set new standards in healthcare delivery and patient safety.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Company Overview */}
            <section className="py-16 bg-slate-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Our Journey</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Established in 1998, DK Medi Group has evolved from a visionary startup into a leading conglomerate in the pharmaceutical sector. As a Group of Companies, we have diversified our expertise to cover various aspects of healthcare, from importing and marketing to distribution.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Our commitment to quality is unwavering. We collaborate with international and multinational companies to bring world-class pharmaceutical products to the local market. We adhere to strict international standards to ensure that every product we handle is safe, effective, and reliable.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    <span className="font-medium">ISO Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    <span className="font-medium">WHO-GMP Compliant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    <span className="font-medium">20+ Years Experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    <span className="font-medium">Global Presence</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[400px] rounded-xl overflow-hidden bg-slate-200 relative">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800')" }} />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Integrity", desc: "We conduct our business with the highest ethical standards." },
                            { title: "Innovation", desc: "We constantly seek new ways to improve healthcare solutions." },
                            { title: "Quality", desc: "We never compromise on the safety and efficacy of our products." },
                            { title: "Customer Focus", desc: "We put the needs of patients and healthcare providers first." },
                            { title: "Sustainability", desc: "We are committed to environmentally responsible practices." },
                            { title: "Teamwork", desc: "We believe in the power of collaboration and mutual respect." },
                        ].map((value, index) => (
                            <div key={index} className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <h3 className="text-xl font-semibold">{value.title}</h3>
                                </div>
                                <p className="text-slate-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
