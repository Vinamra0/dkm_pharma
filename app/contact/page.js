import Link from 'next/link'

export default function Contact() {
    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p className="lead">Get in touch with us for any inquiries.</p>

                    <div className="about-grid">
                        <div className="contact-info">
                            <div className="info-item" style={{ marginBottom: '30px' }}>
                                <h3><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Address</h3>
                                <p>123 Pharma Way, Science Park,<br />New York, NY 10001, USA</p>
                            </div>
                            <div className="info-item" style={{ marginBottom: '30px' }}>
                                <h3><i className="fa-solid fa-phone" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Phone</h3>
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <div className="info-item" style={{ marginBottom: '30px' }}>
                                <h3><i className="fa-solid fa-envelope" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Email</h3>
                                <p>info@dkmpharma.com</p>
                            </div>
                        </div>

                        <div className="contact-form" style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Send us a message</h3>
                            <form>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name</label>
                                    <input type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                                    <input type="email" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Message</label>
                                    <textarea rows="4" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
