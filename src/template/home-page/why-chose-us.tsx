import Heading from '@/components/ui/heading'
import Label from '@/components/ui/label'
import List from '@/components/ui/list'
import React from 'react'

const WhyChoseUs = () => {
  return (
    <>
        <section className="bg-white py-[100px] flex container mx-auto px-3">
            <div className='flex-1'>
                <Label>WHY choose US</Label>
                <Heading colorText="Success" className="mt-4 mb-3 !leading-10 !text-[36px]">Solutions Today for Tomorrow’s </Heading>
                <p className='text-text'>Accelerate Growth with Vertical Tech and Emerging Innovations</p>
                <p className='text-text'>Empower dynamic industries through modern solutions and strong team collaboration.</p> 
                <ul className='mt-10 text-lg text-black-20 flex flex-col gap-[11px]'>
                    <List>Your Digital Growth Experts</List>
                    <List>Technology for Maximum Impact</List>
                </ul>
            </div>
            <div className='max-w-[370px] w-full'>
                h
            </div>
            <div className='flex-1'>
                j
            </div>
        </section>
    </>
  )
}

export default WhyChoseUs