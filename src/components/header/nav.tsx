"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { navItems } from './nav-items'

const Nav = () => {
    const pathname = usePathname()

    return (
        <ul className='flex items-center justify-center gap-10 relative'>
            {
                navItems.map((item, index) => {
                    const isActive = item.href === '/' 
                        ? pathname === '/' 
                        : pathname.startsWith(item.href)

                    return (
                        <li key={index} className='inline-block mr-6'>
                            <Link
                                href={item.href}
                                className={`font-medium hover:text-blue-10 ${isActive ? 'text-blue-10' : 'text-white'}`}
                            >
                                {item.label}
                            </Link>
                            {isActive && (
                                <div className='h-[1.6px] mt-[2px] absolute -bottom-[2px] w-[36px] bg-blue-10'/>
                            )}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Nav
