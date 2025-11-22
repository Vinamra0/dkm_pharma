"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
    { name: "Virchow Biotech", logo: "/assets/companies/virchow.jpeg" },
    { name: "Wellspring", logo: "/assets/companies/wellspring.jpg" },
    { name: "Zydus", logo: "/assets/companies/zydus.jpg" },
    { name: "BioteQ", logo: "/assets/companies/bioteq.jpg" },
    { name: "Boehringer Ingelheim", logo: "/assets/companies/boehringer.jpg" },
    { name: "Cochlear", logo: "/assets/companies/cochlear.png" },
    { name: "GE Healthcare", logo: "/assets/companies/ge.jpg" },
    { name: "Gland", logo: "/assets/companies/gland.jpg" },
    { name: "Janssen", logo: "/assets/companies/janssen.jpg" },
    { name: "MSN", logo: "/assets/companies/msn.png" },
    { name: "Naprod", logo: "/assets/companies/naprod.jpeg" },
    { name: "Panacea Biotec", logo: "/assets/companies/panacea.png" },
    { name: "Plan 1 Health", logo: "/assets/companies/plan1.png" },
    { name: "Polymed", logo: "/assets/companies/polymed.png" },
    { name: "Supravitz", logo: "/assets/companies/supravitz.png" },
    { name: "Viatris", logo: "/assets/companies/viatris.png" },
];

export function CompaniesSection() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                    Trusted by Global Partners
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    We collaborate with leading international and multinational companies to bring the best healthcare solutions to you.
                </p>
            </div>

            <div className="flex overflow-hidden mt-8">
                <motion.div
                    className="flex gap-16 items-center pr-16"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ width: "fit-content" }}
                >
                    {[...companies, ...companies].map((company, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex items-center justify-center w-48 h-24 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer p-4"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 192px"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
