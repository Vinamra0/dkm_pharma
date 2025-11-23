import Link from 'next/link'

export default function Careers() {
    return (
        <main>
            <div className="breadcrumb-area">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li>Careers</li>
                    </ul>
                </div>
            </div>

            <section className="content-section">
                <div className="container">
                    <h1>Join Our Team</h1>
                    <p className="lead">Build your career with a growing pharmaceutical leader.</p>

                    <div className="careers-list" style={{ maxWidth: '800px' }}>
                        <div className="job-card" style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h3>Senior Research Scientist</h3>
                            <p style={{ color: 'var(--light-text)', marginBottom: '10px' }}>R&D | Full Time | New York</p>
                            <p style={{ marginBottom: '15px' }}>We are looking for an experienced scientist to lead our formulation development team.</p>
                            <a href="#" className="btn btn-outline">Apply Now</a>
                        </div>

                        <div className="job-card" style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h3>Quality Control Analyst</h3>
                            <p style={{ color: 'var(--light-text)', marginBottom: '10px' }}>Quality | Full Time | New Jersey</p>
                            <p style={{ marginBottom: '15px' }}>Responsible for testing and analysis of raw materials and finished products.</p>
                            <a href="#" className="btn btn-outline">Apply Now</a>
                        </div>

                        <div className="job-card" style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h3>Sales Manager</h3>
                            <p style={{ color: 'var(--light-text)', marginBottom: '10px' }}>Sales | Full Time | Remote</p>
                            <p style={{ marginBottom: '15px' }}>Drive sales growth in the assigned territory and manage key accounts.</p>
                            <a href="#" className="btn btn-outline">Apply Now</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
