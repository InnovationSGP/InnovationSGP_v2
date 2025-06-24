// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
//
// const Logo = (home, mobile, contrast) => {
//   return (
//     <Link href="/">
//       <Image src="/logo.svg"   style={{ width: 'auto', height: 'auto' }}
//              className="w-auto h-auto" alt="Logo" width={187} height={17} />
//     </Link>
//   )
// }
//
// export default Logo



import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({  contrast }: { contrast?: boolean }) => {
  const logoSrc = contrast ? '/secondLogo.svg' : '/logo.svg';

  return (
    <Link href="/">
      <Image
        src={logoSrc}
        style={{ width: 'auto', height: 'auto' }}
        className="w-auto h-auto p-2"
        alt="Logo"
        width={187}
        height={17}
      />
    </Link>
  );
};

export default Logo;