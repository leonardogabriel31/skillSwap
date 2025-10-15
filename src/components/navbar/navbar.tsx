"use client";
import Link from 'next/link'
import React from 'react'
import { Menu, X } from "lucide-react";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    const mockUser = {
        username: "leonardo",
    }

  return (
    <div>
        <header className='bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50'>
            <Link href={"/"} className="text-xl font-bold text-blue-600">
                SkillSwap
            </Link>
            <nav className="hidden md:flex gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                <Link href="/explore" className="text-gray-600 hover:text-blue-600">Explore</Link>
                <Link href={`/profile/${mockUser.username}`} className="text-gray-600 hover:text-blue-600">Profile</Link>
                {/* <Link href="/onboarding" className="text-gray-400 hover:text-blue-500">Onboarding</Link> */}
            </nav>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className='md:hidden text-gray-600 hover:text-blue-600 focus:outline-none'
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {menuOpen && (
                <div className='absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden animate-fade-in-down'>
                    <Link
                        href={"/"}
                        className='text-gray-600 hover:text-blue-600'
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>

                    <Link
                        href={"/explore"}
                        className='text-gray-600 hover:text-blue-600'
                        onClick={() => setMenuOpen(false)}
                    >
                        Explore
                    </Link>

                    <Link
                        href={`/profile/${mockUser.username}`}
                        className='text-gray-600 hover:text-blue-600'
                        onClick={() => setMenuOpen(false)}
                    >
                        Profile
                    </Link>
                </div>
            )}
        </header>
    </div>
  )
}
