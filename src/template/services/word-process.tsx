import React from "react";
import Image from "next/image";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";

function WordProcess({ data }: any) {
  return (
    <section className={`blog_gradient`}>
      <div className="container mx-auto px-4 py-14">
        <div className={`flex flex-col-reverse gap-10 lg:flex-row `}>
          {/* Image */}
          <div className={`w-full lg:w-1/2 relative mx-auto`}>
            <Image
              src={data?.steps_images?.[0]}
              width={600}
              height={600}
              alt="Main image"
              className="w-[90%] h-[400px] md:h-[551px] rounded-xl object-cover"
            />
            {data?.steps_images?.[1] && (
              <figure className="bg-white p-1 -right-1 md:right-6 rounded-[10px] absolute bottom-10">
                <Image
                  src={data?.steps_images?.[1]}
                  width={238}
                  height={274}
                  alt="Overlay"
                  className={`w-[150px] sm:w-[238px]`}
                />
              </figure>
            )}
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 mx-auto">
            <Label>Tech Consulting</Label>

            <Heading
              colorText={data?.steps_color_title}
              className="mt-3 text-black-20  md:!text-[40px] leading-tight"
            >
              {data?.steps_plain_title}
            </Heading>

            {data?.step?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {data?.step?.map((step: any, index: number) => (
                  <div key={index}>
                    <span className="bg-[#7F9AD6] flex-1 text-white py-2 px-4 rounded-full inline-block mb-2">
                      {index + 1}
                    </span>
                    <Heading
                      colorText=""
                      className="text-black-20 !text-[18px] mb-1"
                    >
                      {step.title}
                    </Heading>
                    <p className="text-sm text-gray-600 md:text-base -mt-1">
                      {step.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WordProcess;
