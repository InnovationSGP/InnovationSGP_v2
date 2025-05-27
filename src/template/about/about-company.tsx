import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';

const cardData = [
  {
    img: '/images/Quick-solutions.svg',
    title: 'Quick solutions',
    desc: 'Our consultancy excels in providing quick solutions tailored to your business challenges',
  },
  {
    img: '/images/innovation.png',
    title: 'Innovation',
    desc: 'Innovative solutions to help you stay ahead in a competitive market.',
  },
  {
    img: '/images/support.png',
    title: 'Support',
    desc: 'Reliable support at every step of your growth journey.',
  },
  {
    img: '/images/growth.png',
    title: 'Scalable Growth',
    desc: 'Scalable solutions tailored to meet your business needs.',
  },
];

function AboutCompany() {
  return (
    <section className="py-20 bg-gray-100 px-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <Label>About our company</Label>
            <Heading
              colorText="each & every challenge"
              className="mt-4 mb-3 !leading-10 max-w-[817px]"
            >
              Crafting success tailored solution for
            </Heading>
          </div>
          <div>
            <p className="text-[20px]">
              Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight and innovative approaches.
            </p>
            <div className="max-w-[190px] w-full mt-8">
              <Button className="hidden md:flex">Contact Us</Button>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="  mb-4">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={50}
                  height={50}
                  className="p-2 border border-[#486EC4] rounded-full bg-[#DFE8FF] overflow-hidden"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
