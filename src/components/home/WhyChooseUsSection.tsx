"use client";

import { ShieldCheck, Globe, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "25+ Years of Experience",
        description: "A long-standing track record in healthcare distribution across Nepal with trusted execution since 1998.",
    },
    {
        icon: Globe,
        title: "Global Partnerships",
        description: "Collaborations with international pharmaceutical and medical technology leaders to bring advanced treatment options locally.",
    },
    {
        icon: Users,
        title: "Healthcare Network",
        description: "Strong hospital, clinic, pharmacy, and distributor network supporting nationwide healthcare access.",
    },
    {
        icon: Heart,
        title: "Affordability & Accessibility",
        description: "Focused on making healthcare accessible first, and affordable for every patient.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
        },
    },
};

export function WhyChooseUsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 pb-2">
                        Trusted Healthcare Partner
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Reliable healthcare solutions backed by global collaboration, local execution, and patient-first commitment.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                            }}
                            className="group relative bg-white rounded-3xl p-10 h-full flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                        >
                            {/* Base gentle shadow */}
                            <div className="absolute inset-0 rounded-3xl shadow-sm shadow-blue-50/50 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)]" />

                            <div className="relative z-10 w-full flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
                                >
                                    <feature.icon className="w-8 h-8" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
