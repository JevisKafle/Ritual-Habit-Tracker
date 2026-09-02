'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"
import { getMe } from "@/lib/api-client"

const navItems = [
    { id: 1, name: 'Home', path: '/home' },
    { id: 2, name: 'About', path: '/about' },
]

function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .map(part => part[0]?.toUpperCase() ?? "")
        .slice(0, 2)
        .join("");
}

export default function Navbar() {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [initials, setInitials] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        setIsLoggedIn(!!token)
    }, [pathname])

    useEffect(() => {
        if (!isLoggedIn) {
            setInitials(null)
            return
        }
        getMe()
            .then(data => setInitials(getInitials(data.name || data.email)))
            .catch(() => setInitials(null))
    }, [isLoggedIn, pathname])

    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-hover-surface sticky top-0 z-50 border-b border-border">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
                            <span className="text-[10px] text-white">
                                ✦
                            </span>
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
                        <div className="w-8 h-8 rounded-full border border-border bg-primary text-white flex items-center justify-center text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer">
                            {initials ?? ""}
                        </div>
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