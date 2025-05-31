import Image from "next/image";
import React from "react";

export const services = [
  {
    id: 1,
    title: "Deploy fast and safe",
    description:
      "Deploy your solutions quickly and securely without compromising quality. Our streamlined approach minimizes downtime, ensuring smooth and stable rollouts.",
    icon: "/svg/service-icon.svg",
    active: false,
    image: "/images/service-image.jpg",
  },
  {
    id: 2,
    title: "Project Management & delivery",
    description:
      "We deliver end-to-end project management solutions to keep your initiatives on time and on budget. With strategic planning and agile execution, we turn ideas into results.",
    image: "/images/service-image.jpg",
    icon: "/svg/service-icon.svg",
    active: true,
  },
  {
    id: 3,
    title: "Agile Product Delivery",
    image: "/images/service-image.jpg",
    description:
      "We help you bring products to market faster with agile delivery methods. Our approach ensures continuous improvement, rapid iterations, and customer-focused outcomes.",
    icon: "/svg/service-icon.svg",
    active: false,
  },
];

const ServiceList = () => {
  return (
    <div className="container mx-auto border-t border-[#06323226] mt-[54px] space-y-4">
      {services.map((service, idx) => (
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
                {service.description}
              </p>
              <div className="pt-2">
                <button className="p-2 rounded-full border border-blue-10 text-blue-30 text-2xl w-[32px] h-[32px] flex justify-center items-center">
                    <span className="-mt-[5px]">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
