import Button from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import Label from '@/components/ui/label'
import List from '@/components/ui/list'
import React from 'react'

function Healthcare() {
  return (
    <section className='py-20 bg-gray-100 px-3'>
         <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div>
                    <Label>Healthcare</Label>
                    <Heading
                      colorText="with Innovation"
                      className="mt-4 mb-3 "
                    >
                     Transforming Healthcare
                    </Heading>
                      <div className="max-w-[190px] w-full mt-8">
                      <Button className="hidden md:flex">Contact Us</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[20px]">
                     From patient engagement to backend efficiency, we modernize healthcare operations through digital solutions, data-driven insights, and regulatory compliance.
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
                </div>
    </section>
  )
}

export default Healthcare;
