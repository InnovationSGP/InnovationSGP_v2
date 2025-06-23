import Heading from '@/components/ui/heading';
import Image from 'next/image';
import React from 'react';

function Logo({data}:any) {
    return (
        <section className='container mx-auto px-4 pb-16 mt-20'>
            {/* Heading with side borders */}
            <div className="flex items-center justify-center gap-4 pb-10">
                <div className="flex-grow h-px bg-gray-300" />
                <Heading colorText="Partners" className="!text-[14px] text-black-20 text-center">
                    Our Trusted
                </Heading>
                <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Logo Grid */}
            <div className='flex justify-center gap-x-12 gap-y-10 flex-wrap items-center'>
                {data?.map((logo:any, index:number) => (
                    <div key={index} className="flex justify-center">
                        <Image
                            src={logo}
                            alt={logo}
                            width={120}
                            height={60}
                            className="object-contain w-[120px] max-h-12"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Logo;
