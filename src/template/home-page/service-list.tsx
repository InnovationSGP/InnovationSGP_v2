import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceList = ({ data }: any) => {
  return (
    <div className="container mx-auto border-t border-[#06323226] mt-[54px] space-y-4">
      {data?.map((service: any, idx: number) => (
        <div className="border-[#06323226] border-b group mb-0" key={idx}>
          <div
            key={service.id}
            className={`flex items-center justify-between rounded-3xl gap-10 cursor-pointer group-hover:bg-blue-10/10 pr-6 py-7 group-hover:py-0 transition-all`}
          >
            <div className="flex items-center gap-10">
              <Image
                src={service.image}
                alt="Service"
                className="w-[222px] h-[154px] rounded-lg object-cover hidden group-hover:block"
                width={222}
                height={154}
              />

              <figure className="w-[64px] h-[64px] group-hover:bg-blue-20 flex justify-center items-center rounded-full bg-[#DFE8FF]">
                <Image
                  src={service.icon}
                  alt="Service"
                  className="object-cover group-hover:invert group-hover:grayscale"
                  width={28}
                  height={28}
                />
              </figure>
              <div className="flex-1 max-w-[325px] w-full">
                <h3 className="font-bold text-2xl">{service.title}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <p className="text-sm text-[#515151] max-w-[400px] mt-1">
                {service.caption}
              </p>
              <div className="pt-2">
                <Link href={service?.link || "#"}>
                  <button className="p-2 rounded-full border border-blue-10 text-blue-30 text-2xl w-[32px] h-[32px] flex justify-center items-center">
                    <span className="-mt-[5px]">›</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
