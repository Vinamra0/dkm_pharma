"use client";

import { ShieldCheck, Globe, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Quality Assurance",
        description: "We adhere to the highest international standards of safety and efficacy in all our pharmaceutical products.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Partnering with world-class manufacturers to bring innovative healthcare solutions to the local market.",
    },
    {
        icon: Users,
        title: "Experienced Team",
        description: "Serving the healthcare community since 1998 with a dedicated team of professionals.",
    },
    {
        icon: Heart,
        title: "Customer Focus",
        description: "Committed to improving patient lives through accessible and reliable medication.",
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
            ease: "easeOut",
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        Why Choose DK Medi Group?
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We are dedicated to excellence in every aspect of our operations, ensuring better health for everyone.
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
