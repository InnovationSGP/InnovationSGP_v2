import Image from "next/image";
import React from "react";

const Clients = ({data}:any) => {
  return (
    <section className="container mx-auto px-3 mb-[60px]">
      <div className="relative mb-[24px]">
        <div className="h-[2px] bg-[#20282D33] w-full" />
        <h2 className="bg-white inline px-5 uppercase font-bold absolute justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-sora py-1 text-center">
          Our Trusted <span className="text-blue-30">Clients</span>
        </h2>
      </div>
      <div className="md:flex justify-around hidden mt-10 items-center">
          {
            data?.home_client?.map((item:any,idx:number)=>{
              return(
                <img src={item} alt="" className="w-[113px]" key={idx} />
              )
            })
          }
      </div>
      <div className="md:hidden logo-scroller mt-10">
        <div className="logo-track flex">
          {
            data?.home_client?.map((item:any,idx:number)=>{
              return(
                <img src={item} alt="" className="w-[113px]" key={idx} />
              )
            })
          }
          {
            data?.home_client?.map((item:any,idx:number)=>{
              return(
                <img src={item} alt="" className="w-[113px]" key={idx} />
              )
            })
          }
        </div>
      </div>

    </section>
  );
};

export default Clients;
