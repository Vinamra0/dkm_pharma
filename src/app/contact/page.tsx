import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-600">
                        Have questions or need assistance? We are here to help. Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Head Office</h4>
                                        <p className="text-slate-600 mt-1 text-sm">
                                            DKM Group, D K M House (Tinkune Marg-82),<br />
                                            Kuleshwor Height, Naya Basti,<br />
                                            Kuleshwor, Kathmandu, Nepal
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Phone</h4>
                                        <p className="text-slate-600 mt-1 text-sm">01-5386780, 01-5378441</p>
                                        <p className="text-slate-600 text-sm">01-5386749, 01-5374678</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Email</h4>
                                        <p className="text-slate-600 mt-1 text-sm">dkmedisales@gmail.com</p>
                                        <p className="text-slate-600 text-sm">ceo@dkmedigroup.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-lg shadow-sm border">
                            <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Inquiry about..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Your message here..."
                                    />
                                </div>
                                <Button size="lg" className="w-full md:w-auto">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
