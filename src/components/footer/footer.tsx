import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <section className="bg-[#486ec4] relative container text-white rounded-[10px] mx-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:px-[56px] py-[73px] px-4 md:py-10">
        <h4 className="font-bold text-[28px] z-[1]">
          Do you need free Consultation?
        </h4>
        <div className="flex items-center gap-4 z-1">
          <Link href="">
            <Image src="/svg/envlop.svg" alt="" width={76} height={76} className="w-[76px]"/>
          </Link>
          <div>
            <p>Send e-Mail</p>
            <p className="text-2xl font-medium">sales@innovationsgp.com</p>
          </div>
        </div>
        <Image src={'/svg/half-circle-shape.svg'} alt="" className="absolute hidden md:block top-0 left-0" width={108} height={102} />
        <Image src={'/svg/half-circle-right.svg'} alt="" className="absolute top-0 right-0" width={108} height={102} />
      </section>
      <section></section>
    </footer>
  );
};

export default Footer;
