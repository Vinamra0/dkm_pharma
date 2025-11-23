import Link from 'next/link'

export default function About() {
    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>About Us</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>About DKM Group</h1>
                    <p className="lead">Dedicated to improving health-related products and services in Nepal since 1998.</p>

                    <div className="about-content" style={{ marginBottom: '60px' }}>
                        <h2>Our Journey in Healthcare</h2>
                        <p>Since 1998, the DKM Group has been a dedicated leader in improving health-related products and services in Nepal. We began by actively partnering with international and multinational pharmaceutical companies, building an efficient sales and marketing network that spans the country through a chain of trusted distributors and retailers.</p>
                        <p>Our commitment is simple: to ensure high-quality, essential medical products and services are promptly available and affordable to every Nepalese patient.</p>
                    </div>

                    <div className="about-content" style={{ marginBottom: '60px' }}>
                        <h2>Driving Healthcare Excellence</h2>

                        <h3 style={{ fontSize: '20px', marginTop: '30px', marginBottom: '15px' }}>Pioneer in Critical Care</h3>
                        <p>DKM has established itself as the No. 1 Marketer and Seller of IV Fluids in Nepal. Our initial success with quality IV fluids and nutrition ranges from partners like Claris Life Sciences paved the way for strategic diversification.</p>

                        <h3 style={{ fontSize: '20px', marginTop: '30px', marginBottom: '15px' }}>Expanding Our Portfolio</h3>
                        <p>We are proud to offer a comprehensive basket of critical care solutions through partnerships with world-renowned pharmaceutical and medical device giants:</p>

                        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <strong>Oncology:</strong> Delivering complete ranges of anti-cancer drugs at affordable prices through collaborations with Biocon, Celon, Biochem, Natco, and others.
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <strong>Nutrition Therapy & Dialysis:</strong> Partnering with Baxter for Nutrition Therapy, CAPD systems, and HD Dialyzers, and Kawasumi for total HD system solutions.
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <strong>Surgical & Anesthesia:</strong> Supplying high-quality surgical sutures and staplers (Demetech), modern surgical gowns and drapes (Kimberly Clark), and anesthesia devices (Edwards, Kawasumi).
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <strong>Antibiotics & Critical Care:</strong> Ensuring the total need for antibiotic injections and oral PPIs for critical conditions is met (Biochem).
                            </div>
                        </div>
                    </div>

                    <div className="about-content" style={{ marginBottom: '60px' }}>
                        <h2>Our Future Focus</h2>
                        <p>DKM is dedicated to a continuous journey of growth and innovation. We are excited to announce plans to diversify our participation into Hospital and Academic Institutions related to the healthcare industry, further shaping the future of health in Nepal.</p>
                    </div>

                    <div className="about-content" style={{ marginBottom: '60px' }}>
                        <h2>Social Responsibility</h2>
                        <p>As a responsible corporate citizen, DKM is committed to serving the society that supports us:</p>

                        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <strong>Empowering Youth:</strong> Nurturing new skills and building talent by providing job opportunities.
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <strong>Community Support:</strong> Running a charitable distribution program for emergency medicines.
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <strong>NGO Collaboration:</strong> Working closely with NGOs to provide assistance and support for cancer patients.
                            </div>
                        </div>
                    </div>

                    <div className="about-grid" style={{ marginBottom: '40px' }}>
                        <div className="about-text">
                            <h2>Our Mission</h2>
                            <p style={{ fontStyle: 'italic', padding: '20px', backgroundColor: 'var(--background-light)', borderLeft: '4px solid var(--primary-color)', borderRadius: '8px' }}>
                                "DKM is committed to bring the best Pharmaceutical, Medicinal and Academic services to Nepalese Health Care Industry, either by venturing with the world's renowned leader of the field or by producing inside the country at its own, adopting the latest technology, procedure and the system of the field to make the Healthcare - first possible and then affordable to every Nepalese patient."
                            </p>
                        </div>
                        <div className="about-text">
                            <h2>Our Vision</h2>
                            <p style={{ fontStyle: 'italic', padding: '20px', backgroundColor: 'var(--background-light)', borderLeft: '4px solid var(--primary-color)', borderRadius: '8px' }}>
                                "We want to be Nepal's No. 1 Health Care Company to work with for every member of the system—employee, doctors, nurses, patients, business partners, and the society."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
