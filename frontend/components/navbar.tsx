'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"
import Image from "next/image"

const navItems = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'About', path: '/about' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        setIsLoggedIn(!!token)
    }, [pathname])

    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-hover-surface sticky top-0 z-50 border-b border-border">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2C5.8 2 4 4 4 6.5c0 3.2 4 7.5 4 7.5s4-4.3 4-7.5C12 4 10.2 2 8 2z" fill="white" />
                        <circle cx="8" cy="6.5" r="1.8" fill="rgba(255,255,255,0.5)" />
                    </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide text-primary-dark">
                    RITUAL
                </span>
            </div>

            <div className="flex items-center gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-150 ${isActive
                                ? 'bg-border text-primary-dark'
                                : 'text-muted-green hover:bg-border hover:text-primary-dark'
                                }`}
                        >
                            {item.name}
                        </Link>
                    )
                })}
                {isLoggedIn ? (
                <Link href="/profile" className="ml-3">
                    <Image
                        src="/default_avatar.png"
                        alt="User profile"
                        width={32}
                        height={32}
                        className="rounded-full border border-border hover:opacity-80 transition-opacity cursor-pointer"
                    />
                </Link>
                ) : (
                    <Link
                        href="/login"
                        className="ml-3 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-dark cursor-pointer"
                    >
                        Login
                    </Link>
                )}



            </div>
        </nav>
    )
}