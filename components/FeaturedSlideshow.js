'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedSlideshow({ products }) {
    const [current, setCurrent] = useState(0)
    const length = products.length

    useEffect(() => {
        if (length === 0) return

        const interval = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [current, length])

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(products) || products.length <= 0) {
        return (
            <div className="featured-card">
                <div className="product-details">
                    <h3>No products available</h3>
                    <p>Check back later for our featured products.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="slideshow-container">
            <button className="slide-arrow left-arrow" onClick={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="featured-card fade">
                <div className="product-image-placeholder">
                    {products[current].imageUrl ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                src={products[current].imageUrl}
                                alt={products[current].name}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    ) : (
                        <i className="fa-solid fa-box-open"></i>
                    )}
                </div>
                <div className="product-details">
                    <h3>{products[current].name}</h3>
                    <p className="product-type">Therapeutic Area: {products[current].therapeuticCat}</p>
                    <p className="product-category">Category: {products[current].dosageForm}</p>
                </div>
                <div className="product-action">
                    <Link href={`/products/${products[current].id}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>

            <button className="slide-arrow right-arrow" onClick={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="dots-container">
                {products.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === current ? 'active' : ''}`}
                        onClick={() => setCurrent(index)}
                    ></span>
                ))}
            </div>
        </div>
    )
}
