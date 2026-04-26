"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import {
    Target,
    Heart,
    Pill,
    Activity,
    FlaskConical,
    Handshake,
    Globe,
    TrendingUp,
    ShieldCheck,
    Building2,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const whatWeDo = [
    {
        icon: Pill,
        title: "Pharmaceutical Distribution",
        points: [
            "IV fluids and nutrition therapies",
            "Antibiotics and critical care medicines",
            "Oncology (anti-cancer drugs)",
            "Portfolio access via Biocon, Natco, Naprod, and Biochem",
        ],
    },
    {
        icon: Activity,
        title: "Medical Devices & Hospital Supplies",
        points: [
            "Dialysis systems and HD equipment",
            "Anesthesia devices",
            "Surgical sutures, gowns, and drapes",
            "Infusion systems and critical care tools",
        ],
    },
    {
        icon: FlaskConical,
        title: "Nutrition & Specialty Care",
        points: [
            "Parenteral nutrition solutions",
            "Protein supplements (e.g., EverPRO)",
            "Specialized hospital nutrition systems",
        ],
    },
];

const productCategories = [
    "IV Fluids & Infusion Systems",
    "Oncology & Specialty Drugs",
    "Antibiotics & Critical Care Medicines",
    "Dialysis & Renal Care",
    "Surgical & Hospital Consumables",
    "Clinical Nutrition",
];

const impactPoints = [
    "Nationwide distribution network",
    "Affordable access to advanced therapies",
    "Support for cancer patients and critical care",
    "Employment and skill development initiatives",
    "Charitable medicine distribution and NGO collaboration",
];

const whyChoose = [
    "25+ years of experience in healthcare distribution",
    "Strong network of hospitals and pharmacies",
    "Partnerships with global pharmaceutical leaders",
    "Commitment to affordability and accessibility",
    "Broad portfolio across critical healthcare segments",
];

const clients = [
    "Hospitals & Clinics",
    "Healthcare Institutions",
    "Pharmacies & Distributors",
    "Government & NGOs",
    "Academic Medical Institutions",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen page-surface">
            <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 py-20 text-white">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            <span className="block">Who We Are at</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-400 to-cyan-300">DK Medi Group</span>
                        </h1>
                        <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                            DK Medi Group (DKM) is a healthcare-focused organization dedicated to improving access to high-quality medical products and services across Nepal.
                            Since 1998, DKM has been actively engaged in pharmaceutical distribution, collaborating with leading international and multinational healthcare companies.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <section className="py-16 bg-white/25">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div whileHover={{ y: -6 }} className="surface-card p-10 rounded-3xl shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300">
                            <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="h-7 w-7 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900">Mission</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To deliver world-class pharmaceutical, medical, and academic healthcare solutions by partnering with global leaders and leveraging modern technologies,
                                making healthcare accessible first, and affordable for every patient.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -6 }} className="surface-card p-10 rounded-3xl shadow-sm shadow-blue-50/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300">
                            <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <Heart className="h-7 w-7 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900">Vision</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To become Nepal's most trusted healthcare company for patients, providers, and partners across the healthcare ecosystem.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white/20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">What We Do</h2>
                        <p className="text-slate-600 text-lg">Comprehensive Healthcare Solutions across multiple healthcare segments.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {whatWeDo.map((item) => (
                            <motion.div key={item.title} whileHover={{ y: -6 }} className="surface-card rounded-3xl p-8 shadow-sm shadow-blue-50/50 hover:shadow-[0_18px_34px_-15px_rgba(37,99,235,0.2)] transition-all duration-300">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                                    <item.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <ul className="space-y-3">
                                    {item.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                                            <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white/22">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Product Categories</h2>
                            <p className="text-slate-600 mb-6">
                                DKM distributes a wide range of products from global manufacturers, including infusion solutions,
                                chemotherapy drugs, dialysis consumables, and intensive care medicines.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {productCategories.map((category) => (
                                    <div key={category} className="surface-card flex items-center gap-2 rounded-xl border border-white/60 px-4 py-3 text-slate-700 text-sm font-medium">
                                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                                        <span>{category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="surface-card rounded-3xl p-8 border border-white/70">
                            <div className="flex items-center gap-3 mb-4">
                                <Handshake className="h-6 w-6 text-blue-600" />
                                <h3 className="text-2xl font-bold text-slate-900">Partnerships</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-5">
                                DK Medi Group works closely with internationally recognized pharmaceutical and medical technology companies to bring advanced healthcare solutions into Nepal.
                            </p>
                            <div className="space-y-2 text-slate-700 text-sm">
                                <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-blue-600" /> Access to cutting-edge treatments</div>
                                <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-blue-600" /> Consistent product quality</div>
                                <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-blue-600" /> International standards of care</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white/18">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="surface-card rounded-3xl p-8 shadow-sm border border-white/70">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                                <h3 className="text-2xl font-bold text-slate-900">Impact</h3>
                            </div>
                            <ul className="space-y-3">
                                {impactPoints.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="surface-card rounded-3xl p-8 shadow-sm border border-white/70">
                            <div className="flex items-center gap-3 mb-4">
                                <Building2 className="h-6 w-6 text-blue-600" />
                                <h3 className="text-2xl font-bold text-slate-900">Why Choose DKM</h3>
                            </div>
                            <ul className="space-y-3">
                                {whyChoose.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white/28">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Clients & Target Segments</h2>
                        <p className="text-slate-600">Serving diverse stakeholders across Nepal's healthcare ecosystem.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {clients.map((item) => (
                            <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                {item}
                            </span>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-slate-900 text-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Improve Healthcare Together</h2>
                        <p className="text-slate-300 text-lg mb-8">
                            Whether you're a healthcare provider, partner, or distributor, DK Medi Group is ready to collaborate.
                        </p>
                        <Button size="lg" variant="premium" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
}
