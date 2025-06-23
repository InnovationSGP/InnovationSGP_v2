import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.svg" className="w-auto h-auto" alt="Logo" width={187} height={17} />
    </Link>
  )
}

export default Logo