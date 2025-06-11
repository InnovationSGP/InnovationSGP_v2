"use client"
import React, { useState } from 'react'
import Logo from './logo'
import Image from 'next/image'
import { navItems } from './nav-items'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const MobileHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [currentSubMenu, setCurrentSubMenu] = useState(null)
    const pathname = usePathname();

    const handelMobileMenu = (href) => {
        if (currentSubMenu === href) {
            setCurrentSubMenu(null)
        } else {
            setCurrentSubMenu(href)
        }
    }

    return (
        <>
            <header className='md:hidden px-[17px] py-[26px] flex justify-between items-center z-50 fixed w-full bg-[linear-gradient(120deg,_#3D60AD_21.65%,_#153170_78.35%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                <Logo />
                <button>
                    <Image src="/svg/menu-burger.svg" alt='' width={28} height={28} onClick={() => setOpenMenu(!openMenu)} />
                </button>
            </header>
            <nav className={`absolute left-0 w-full bg-white z-40 transition-all duration-300 ease-in-out h-full
                bg-[linear-gradient(120deg,_#3D60AD_21.65%,_#153170_78.35%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
                ${openMenu ? 'top-0' : '-top-full'}`}
            >
                <ul className='flex items-start px-4 mt-28 flex-col gap-10'>
                    {
                        navItems.map((item, index) => {
                            const isActive =
                                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            return (
                                <li key={index} className={`inline-block mr-6 relative`}>
                                    <div className="flex gap-1 items-center">
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpenMenu(!openMenu)}
                                            className={`font-medium hover:text-blue-10 text-white
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                        {
                                            item.subMenu && <button onClick={() => handelMobileMenu(index)}>
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                    <path
                                                        d="M15 8.00004C15 8.00004 11.3176 13 9.99996 13C8.68237 13 5 8 5 8"
                                                        stroke="#ECECEC"
                                                        strokeWidth="1.25"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                    {isActive && <div className='h-[1px] mt-[2px] absolute -bottom-[5px] w-[36px] bg-white' />}

                                    {/* sub nav  */}
                                    {
                                        item.subMenu && currentSubMenu === index && (
                                            <ul className='flex flex-col gap-4 mt-5 pl-5'>
                                                {
                                                    item.subMenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                href={subItem.href}
                                                                className={`font-medium hover:text-blue-10 ${isActive ? "text-blue-10" : "text-white"
                                                                    }`}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </>
    )
}

export default MobileHeader