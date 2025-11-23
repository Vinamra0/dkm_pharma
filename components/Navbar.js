import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link href="/">
                        <Image
                            src="/assets/dkm_logo.png"
                            alt="DKM Group"
                            width={180}
                            height={60}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/rnd">R&D</Link></li>
                    <li><Link href="/careers">Careers</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/admin" style={{ color: 'var(--primary-color)' }}><i className="fa-solid fa-lock"></i> Admin</Link></li>
                </ul>
            </div>
        </nav>
    )
}
