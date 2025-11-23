import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import FeaturedSlideshow from '@/components/FeaturedSlideshow'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const products = await prisma.product.findMany()

    return (
        <main>
            <header className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1>Adding Value to Human Life Through Quality Healthcare</h1>
                        <p>Trusted pharmaceutical manufacturing with proven quality, innovation, and global reach.</p>
                        <div className="hero-buttons">
                            <Link href="/products" className="btn btn-primary">Explore Products</Link>
                            <Link href="/about" className="btn btn-outline">About DKM</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/assets/doctor_illustration_line_art.png" alt="Doctor Illustration" />
                    </div>
                </div>
            </header>

            <section className="stats">
                <div className="container stats-grid">
                    <div className="stat-item">
                        <h3>100+</h3>
                        <p>Products</p>
                    </div>
                    <div className="stat-item">
                        <h3>25+</h3>
                        <p>Therapeutic Segments</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon"><i className="fa-solid fa-earth-americas"></i></div>
                        <p>Global Distribution</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon"><i className="fa-solid fa-certificate"></i></div>
                        <p>GMP ISO Certified Manufacturing</p>
                    </div>
                </div>
            </section>

            <section className="services">
                <div className="container services-grid">
                    <div className="service-card">
                        <div className="card-icon"><i className="fa-solid fa-prescription-bottle-medical"></i></div>
                        <h3>Pharmaceuticals</h3>
                        <p>High-quality medicines for diverse therapeutic areas</p>
                        <Link href="/products" className="learn-more">Explore <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    <div className="service-card">
                        <div className="card-icon"><i className="fa-solid fa-pills"></i></div>
                        <h3>Healthcare Products</h3>
                        <p>Innovative healthcare solutions for better well-being.</p>
                        <Link href="/products" className="learn-more">Explore <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    <div className="service-card">
                        <div className="card-icon"><i className="fa-solid fa-industry"></i></div>
                        <h3>Manufacturing & Exports</h3>
                        <p>Global reach with state-of-the-art manufacturing facilities</p>
                        <Link href="/manufacturing" className="learn-more">Explore <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                </div>
            </section>

            <section className="featured">
                <div className="container">
                    <h2>Featured Products</h2>
                    <FeaturedSlideshow products={products} />
                </div>
            </section>

            <section className="why-choose-us">
                <div className="container">
                    <h2>Why Choose Us</h2>
                    <div className="reasons-grid">
                        <div className="reason-card">
                            <div className="reason-icon"><i className="fa-solid fa-shield-halved"></i></div>
                            <div className="reason-content">
                                <h3>WHO-GMP Compliant</h3>
                                <p>Company News</p>
                                <span className="date">Jan 18, 2023</span>
                            </div>
                        </div>
                        <div className="reason-card">
                            <div className="reason-icon"><i className="fa-solid fa-flask-vial"></i></div>
                            <div className="reason-content">
                                <h3>Quality-Controlled Manufacturing</h3>
                                <p>Press Release</p>
                                <span className="date">Dec 10, 2022</span>
                            </div>
                        </div>
                        <div className="reason-card">
                            <div className="reason-icon"><i className="fa-solid fa-microscope"></i></div>
                            <div className="reason-content">
                                <h3>Strong R&D Backbone</h3>
                                <p>Contact</p>
                                <span className="date">Nov 20, 2022</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
