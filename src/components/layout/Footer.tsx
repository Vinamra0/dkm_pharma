import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Container } from "@/components/ui/container"

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                                DK
                            </div>
                            <h3 className="text-lg font-bold text-white">Medi Group</h3>
                        </div>
                        <p className="text-sm text-slate-400">
                            Dedicated to providing high-quality pharmaceutical products for a healthier community.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-blue-400 transition-colors">
                                    Our Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/career" className="hover:text-blue-400 transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Products</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products?category=tablets" className="hover:text-blue-400 transition-colors">
                                    Tablets
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=syrups" className="hover:text-blue-400 transition-colors">
                                    Syrups
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=injections" className="hover:text-blue-400 transition-colors">
                                    Injections
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
                                <span>123 Pharma Street, Medical District, Kathmandu, Nepal</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 shrink-0 text-slate-400" />
                                <span>+977-1-4XXXXXX</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                                <span>info@dkmedigroup.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} DK Medi Group. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    )
}
