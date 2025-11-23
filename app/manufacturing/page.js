import Link from 'next/link'

export default function Manufacturing() {
    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Manufacturing</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>Manufacturing Excellence</h1>
                    <p className="lead">World-class facilities meeting global standards.</p>

                    <div className="about-grid">
                        <div className="about-text">
                            <h2>Infrastructure</h2>
                            <p>Our manufacturing units are designed to meet global regulatory requirements. We have dedicated facilities for different dosage forms including tablets, capsules, liquids, and injectables.</p>

                            <h2>Quality Assurance</h2>
                            <p>We adhere to strict GMP guidelines and have received accreditations from major regulatory bodies. Our Quality Control labs ensure that every product leaving our facility meets the highest standards of safety and efficacy.</p>
                        </div>
                        <div className="about-image">
                            <div className="placeholder-image"><i className="fa-solid fa-industry"></i></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
