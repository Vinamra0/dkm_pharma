import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <Link href="/">
                        <Image
                            src="/assets/dkm_logo.png"
                            alt="DKM Group"
                            width={150}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                </div>
                <div className="footer-links">
                    <Link href="/products">Products</Link>
                    <Link href="/rnd">R&D</Link>
                    <Link href="/careers">Careers</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </footer>
    )
}
