"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm transition-all duration-300">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                                DK
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">DK Medi Group</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </Container>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
                    <Container className="py-4">
                        <nav className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    )
}
