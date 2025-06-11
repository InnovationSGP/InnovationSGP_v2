
import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import List from '@/components/ui/list';
import Image from 'next/image';
import React from 'react'

function Governance() {
    return (
        <section className="mb-[60px] container mx-auto px-3 mt-14">
            <div className="flex flex-col md:flex-row items-center justify-start md:justify-between">
                <div>
                    <Label>Governance, Risk, & Compliance (GRC)</Label>
                    <Heading
                        colorText={`Risk Management`}
                        className="mt-4 mb-3 !leading-10 max-w-[817px]"
                    >
                        Strengthening Compliance and
                    </Heading>
                </div>
            </div>
            {/*  */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 items-center mt-8'>
                <div>
                    <Image
                        src='/images/about.png'
                        alt="Choose Us Image"
                        width={500}
                        height={500}
                        className='w-[90%] h-[551px] rounded-xl object-fill'
                    />
                </div>
                <div>
                    <p className='text-lg text-text'>
                        Protect your organization while driving sustainable growth. In today’s complex regulatory environment, effective governance, risk management, and compliance are not just safeguards—they're strategic enablers.
                    </p>
                    <p className='text-lg text-text py-4'>
                        Our GRC solutions help you build a strong foundation of trust and resilience by aligning your compliance efforts with business goals. We guide you through evolving industry regulations, assess organizational risks, and implement frameworks that promote accountability, transparency, and operational excellence.
                    </p>
                     <Heading
                      colorText="Our Goals :"
                      className="mt-4 mb-3 !text-[20px]"
                    >      
                    </Heading>
                    <List>improved outcomes</List>
                    <List>reduced costs</List>
                    <List>smarter care delivery</List>
                </div>
            </div>
        </section>
    )
}

export default Governance;
