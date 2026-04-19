import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Container } from "@/components/ui/container"

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-950 via-[#0b2940] to-[#0f3f55] text-slate-200 border-t border-white/10 shadow-[0_-10px_40px_-22px_rgba(11,60,93,0.8)]">
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="mb-4">
                            <Image
                                src="/assets/branding/dkm-logo-clean.png"
                                alt="DKM Group"
                                width={220}
                                height={64}
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                        <p className="text-sm text-slate-400">
                            Dedicated to providing high-quality pharmaceutical products for a healthier community.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-cyan-300 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="hover:text-cyan-300 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="hover:text-cyan-300 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-cyan-300 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-cyan-300 transition-colors">
                                    Our Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-cyan-300 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/career" className="hover:text-cyan-300 transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Products</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products?category=tablets" className="hover:text-cyan-300 transition-colors">
                                    Tablets
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=syrups" className="hover:text-cyan-300 transition-colors">
                                    Syrups
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=injections" className="hover:text-cyan-300 transition-colors">
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
                                <span>
                                    DKM Group<br />
                                    D K M House ( Tinkune Marg-82)<br />
                                    Kuleshwor Height, Naya Basti, Kuleshwor, Kathmandu, Nepal
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 shrink-0 text-slate-400" />
                                <span>Phone: 01-5386780, 01-5378441, 01-5386749, 01-5374678</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                                <span>Email: dkmedisales@gmail.com, ceo@dkmedigroup.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-300">
                    <p>&copy; {new Date().getFullYear()} DK Medi Group. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    )
}
