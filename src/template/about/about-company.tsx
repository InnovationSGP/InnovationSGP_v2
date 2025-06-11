import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';


function AboutCompany({data}:any) {
  return (
    <section className="py-20 bg-gray-100 px-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <Label>{data?.about_us_label}</Label>
            <Heading
              colorText={data?.about_us_color_title}
              className="mt-4 mb-3 !leading-10 max-w-[817px]"
            >
              {data?.about_us_plain_title}
            </Heading>
          </div>
          <div>
            <div className="text-[20px]">
              <div className="!text-[20px]" dangerouslySetInnerHTML={{ __html: data?.about_us_discription }}/>
            </div>
            <div className="max-w-[190px] w-full mt-8">
              <Button href={data?.about_us_button_link} className="hidden md:flex">Contact Us</Button>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.about_us_card?.map((card:any, index:number) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="  mb-4">
                <Image
                  src={card.icon_}
                  alt={card.plain_title??"no alt title provided"}
                  width={50}
                  height={50}
                  className="p-2 border border-[#486EC4] rounded-full bg-[#DFE8FF] overflow-hidden"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.plain_title}</h3>
              <p className="text-gray-600">{card.discription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
