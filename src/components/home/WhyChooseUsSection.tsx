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

export function WhyChooseUsSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Why Choose DK Medi Group?
                    </h2>
                    <p className="text-lg text-slate-600">
                        We are dedicated to excellence in every aspect of our operations, ensuring better health for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
