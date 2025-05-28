import Image from "next/image";
import React from "react";

const Clients = () => {
  return (
    <section className="container mx-auto px-3 mb-[60px]">
      <div className="relative mb-[24px]">
        <div className="h-[2px] bg-[#20282D33] w-full" />
        <h2 className="bg-white inline px-5 uppercase font-bold absolute justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-sora py-1 text-center">
          Our Trusted <span className="text-blue-30">Clients</span>
        </h2>
      </div>
      <div className="md:flex justify-around hidden mt-10 items-center">
          <Image src="/images/logo-1.svg" alt="" className="" width={113} height={35}/>
          <Image src="/images/logo-2.png" alt="" className="" width={204} height={35}/>
          <Image src="/images/logo-3.svg" alt="" className="" width={136} height={91}/>
      </div>
      <div className="md:hidden logo-scroller mt-10">
        <div className="logo-track">
          <Image src="/images/logo-1.svg" alt="Logo 1" width={113} height={35} className="w-[90px]"/>
          <Image src="/images/logo-2.png" alt="Logo 2" width={204} height={35} className="w-[90px]"/>
          <Image src="/images/logo-3.svg" alt="Logo 3" width={136} height={91} className="w-[90px]"/>
          <Image src="/images/logo-1.svg" alt="Logo 1" width={113} height={35} className="w-[90px]"/>
          <Image src="/images/logo-2.png" alt="Logo 2" width={204} height={35} className="w-[90px]"/>
          <Image src="/images/logo-3.svg" alt="Logo 3" width={136} height={91} className="w-[90px]"/>
        </div>
      </div>

    </section>
  );
};

export default Clients;
