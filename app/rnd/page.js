import Link from 'next/link'

export default function RnD() {
    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Research & Development</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>Research & Development</h1>
                    <p className="lead">Innovating for a healthier tomorrow.</p>

                    <div className="about-grid">
                        <div className="about-text">
                            <h2>Our Capabilities</h2>
                            <p>Our state-of-the-art R&D center is equipped with the latest technology to facilitate the development of novel drug delivery systems and complex generics.</p>

                            <h2>Focus Areas</h2>
                            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: 'var(--light-text)', marginBottom: '20px' }}>
                                <li>New Chemical Entities (NCEs)</li>
                                <li>Novel Drug Delivery Systems (NDDS)</li>
                                <li>Process Chemistry</li>
                                <li>Analytical Method Development</li>
                            </ul>
                        </div>
                        <div className="about-image">
                            <div className="placeholder-image"><i className="fa-solid fa-microscope"></i></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
