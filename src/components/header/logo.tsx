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

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  contrast,
  footer,
}: {
  contrast?: boolean;
  footer?: boolean;
}) => {
  const logoSrc = "/logo.svg";
  const footerLogogSrc = "/secondLogo.svg";

  return footer ? (
    <Link href="/" className="flex items-center">
      <Image
        src={footerLogogSrc}
        className="w-50 h-6"
        alt="Logo"
        width={150}
        height={50}
        priority
      />
    </Link>
  ) : (
    <Link href="/" className="flex items-center">
      <Image
        src={logoSrc}
        className="w-50 h-6"
        alt="Logo"
        width={150}
        height={50}
        priority
      />
    </Link>
  );
};

export default Logo;
