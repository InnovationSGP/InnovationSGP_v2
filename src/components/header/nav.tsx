"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const params = usePathname()
  return (
    <ul className='flex items-center justify-center gap-10 relative'>
        {
            navItems.map((item, index) => (
                <li key={index} className={`inline-block mr-6`}>
                    <Link href={item.href} className={`font-medium hover:text-blue-10 ${params.includes(item.href) ? 'text-blue-10' : 'text-white' }`}>
                        {item.label}
                    </Link>
                    {params.includes(item.href) && <div className='h-[1.6px] mt-[2px] absolute -bottom-[2px] w-[36px] bg-blue-10'/>}
                </li>
            ))
        }
    </ul>
  )
}

export default Nav



const navItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Services',
        href: '/services',
    },
    {
        label: 'Sector',
        href: '/sector',
    },
    {
        label: 'Intel',
        href: '/intel',
    },
    {
        label: 'About',
        href: '/about',
    }
]