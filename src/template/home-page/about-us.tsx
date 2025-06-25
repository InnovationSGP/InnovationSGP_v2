"use client";
import Label from "@/components/ui/label";
import React from "react";
import {homeContent} from "@/template/home-page/content";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import Slider from "react-slick";

const AboutUs = ({ data }: any) => {
  const { about } = homeContent;


  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slider = React.useRef<any>(null);

  return (
    <>
      <section
        className="py-16 relative"
        style={{
          background:
            "linear-gradient(180deg, #EFF7FF 54.73%, #FFFFFF 109.46%)",
        }}
      >
        <div className="grid container mx-auto px-3 grid-cols-1 md:grid-cols-2 md:gap-10">
          <div className="relative rounded-[16px] grid-order mt-6 md:mt-0">
            <Slider {...settings} ref={slider}>
              {data?.about_images?.map((item:any, idx:number) => (
                <figure key={idx}>
                  <Image
                    src={item}
                    alt="About Us"
                    width={586}
                    height={448}
                    className="w-full h-[448px] object-cover rounded-[16px]"
                  />
                </figure>
              ))}
            </Slider>
            <div className="bg-blue-40 absolute top-[330px] right-5 md:right-10 p-5 md:px-[28px] md:py-[35px] max-w-[208px] z-10 rounded-[12px]">
              <h4 className="font-semibold text-5xl text-[#E9EEF8]">
                {data?.about_customers_impacted}
              </h4>
              <p className="font- leading-[26px] text-lg text-white font-sans mt-3">
                end users impacted
              </p>
            </div>
            {/* Nav buttons  */}
            <div className="bg-[#F7FBFF] flex items-center gap-3 rounded-tr-[13px] absolute bottom-[4px] left-[-2px] md:bottom-[6px] md:left-0 px-6 md:px-10 py-[22px] z-10">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="bg-black-10 h-10 w-10 cursor-pointer rounded-full flex items-center hover:bg-blue-10 justify-center rotate-180"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
                    fill="#fff"
                  />
                </svg>
              </button>
              <button
                onClick={() => slider?.current?.slickNext()}
                className="bg-black-10 h-10 w-10 cursor-pointer rounded-full flex items-center hover:bg-blue-10 justify-center"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section  */}
          <div className="flex flex-col items-start ">

            <div className="">
  <Label>{data?.about_label}</Label>
  <Heading
    colorText={data?.about_color_title}
    secondColor="blue"
    className="mt-3 text-black-20"
  >
    {data?.about_plain_title}
  </Heading>
  {/*<div className="text-text text-xl mt-3">*/}
  {/*  <div dangerouslySetInnerHTML={{ __html: data?.about_caption }} />*/}
  {/*</div>*/}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-4">
  {data?.about_icon_list?.map((item: any, idx: number) => (
    <div
      key={idx}
      className="flex items-center font-medium gap-5 font-sans"
    >
      <div className="">
        <Image
          src={item?.icon.url}
          alt="About Us"
          width={60}
          height={60}
          className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
        />
      </div>
      <p className="text-blue-50">{item.text}</p>
    </div>
  ))}
</div>

              {/* border  */}
            <div className="bg-[#0632321A] h-[1px] w-full my-[34px]" />
            {/*<ul className="flex flex-col gap-3">*/}
            {/*  {*/}
            {/*    data?.about_list?.length > 0 &&*/}
            {/*    data?.about_list?.map((item:any,idx:number)=>(*/}
            {/*      <List key={idx}>{item?.text}</List>*/}
            {/*    ))*/}
            {/*  }*/}
            {/*</ul>*/}
          </div>
        </div>

        <Image
          src={"/svg/about-shape.svg"}
          alt=""
          className="absolute h-auto w-auto bottom-0 right-0"
          width={210}
          height={160}
        />
      </section>
    </>
  );
};

export default AboutUs;




// "use client";
// import Label from "@/components/ui/label";
// import React from "react";
// import { homeContent } from "@/template/home-page/content";
// import Heading from "@/components/ui/heading";
// import Image from "next/image";
// import Slider from "react-slick";
// import List from "@/components/ui/list";
//
// const AboutUs = ({ data }: any) => {
//   const { about } = homeContent;
//
//   const settings = {
//     dots: true,
//     infinite: true,
//     arrows: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };
//
//   const slider = React.useRef<any>(null);
//
//   return (
//     <section
//       className="py-16 relative bg-gradient-to-b from-blue-50 to-white"
//     >
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Left Section */}
//         <div className="relative">
//           <Slider {...settings} ref={slider}>
//             {data?.about_images?.map((item: any, idx: number) => (
//               <figure key={idx}>
//                 <Image
//                   src={item}
//                   alt="About Us"
//                   width={586}
//                   height={448}
//                   className="w-full h-[300px] md:h-[448px] object-cover rounded-lg shadow-lg"
//                 />
//               </figure>
//             ))}
//           </Slider>
//           <div className="absolute top-[70%] right-5 md:right-10 p-5 bg-blue-600 text-white rounded-lg shadow-lg">
//             <h4 className="text-4xl font-bold">{data?.about_customers_impacted}</h4>
//             <p className="mt-2 text-sm">End users impacted</p>
//           </div>
//           <div className="absolute bottom-4 left-4 flex gap-3">
//             <button
//               onClick={() => slider?.current?.slickPrev()}
//               className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M15 19L8 12L15 5"
//                   stroke="#000"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={() => slider?.current?.slickNext()}
//               className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M9 5L16 12L9 19"
//                   stroke="#000"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//
//         {/* Right Section */}
//         <div>
//           <Label className="text-blue-600">{data?.about_label}</Label>
//           <Heading
//             colorText={data?.about_color_title}
//             secondColor="blue"
//             className="mt-3 text-gray-800"
//           >
//             {data?.about_plain_title}
//           </Heading>
//           <p className="mt-4 text-gray-600 text-lg leading-relaxed">
//             {data?.about_caption}
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//             {data?.about_icon_list?.map((item: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
//               >
//                 <Image
//                   src={item?.icon.url}
//                   alt="Icon"
//                   width={50}
//                   height={50}
//                   className="w-12 h-12"
//                 />
//                 <p className="text-blue-600 font-medium">{item.text}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 border-t border-gray-200 pt-6">
//             <ul className="space-y-4">
//               {data?.about_list?.map((item: any, idx: number) => (
//                 <List key={idx}>{item?.text}</List>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
//
// export default AboutUs;