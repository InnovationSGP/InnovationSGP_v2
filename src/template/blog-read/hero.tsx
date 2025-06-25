// import Heading from '@/components/ui/heading'
// import { getMediaURL } from '@/utils'
// import Image from 'next/image'
// import React from 'react'
//
//
// function Hero({latesposts, post}:any) {
//     return (
//         <section className='bg-gradient-to-b from-[#EFF7FF] to-white pt-24'>
//             <div className='container mx-auto px-4'>
//                 <div className='flex flex-col lg:flex-row gap-10 mb-20  '>
//                     {/* Left Content */}
//                     <div className='w-full lg:w-2/3'>
//                         <Image
//                             src={getMediaURL(post)}
//                             alt="Main Article"
//                             width={500}
//                             height={500}
//                             className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[25px]"
//                         />
//                         <Heading className="mt-10 text-black-20">
//                             {post?.title?.rendered}
//                         </Heading>
//                         {/* Paragraphs */}
//                         <div className='content' dangerouslySetInnerHTML={{ __html: post?.content?.rendered}}/>
//                     </div>
//
//                     {/* Right Sidebar */}
//                     <div className='w-full lg:w-1/3'>
//                         <Heading colorText='You Like' className="mt-10 md:mt-0 text-black-20">
//                             Maybe
//                         </Heading>
//                         <div className="mt-6 flex flex-col gap-6">
//                             {latesposts?.map((item:any, index:number) => (
//                                 <div key={index} className="flex gap-4 items-start">
//                                     <Image
//                                         src={getMediaURL(item)}
//                                         alt={``}
//                                         width={100}
//                                         height={100}
//                                         className="w-[100px] h-[80px] rounded-[12px] object-cover flex-shrink-0"
//                                     />
//                                     <div className='flex flex-col'>
//                                         <span className='text-sm text-gray-500'>{item?.date_gmt}</span>
//                                         <h4 className='text-md font-medium text-[#2D2D2D] leading-snug'>
//                                             {item?.title?.rendered}
//                                         </h4>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }
//
// export default Hero

import Heading from "@/components/ui/heading";
import { getMediaURL } from "@/utils";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import GutenbergRenderer from "@/components/gutenberg";

// Install this library using `npm install dompurify`

function Hero({ latesposts, post }: any) {
  // Sanitize the HTML content
  const postHtml = DOMPurify.sanitize(post?.content?.rendered);

  return (
    <section className="bg-gradient-to-b from-[#EFF7FF] to-white pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            <Image
              src={getMediaURL(post)}
              alt="Main Article"
              width={500}
              height={500}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[25px]"
            />
            <Heading className="mt-10 text-black-20">
              {post?.title?.rendered}
            </Heading>
            {/* Render sanitized HTML */}
            <div className="content wp-styles" />
            <div className="prose prose-lg">
              <GutenbergRenderer content={post?.content?.rendered} />
              {/*{parse(postHtml)}*/}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <Heading
              colorText="You Like"
              className="mt-10 md:mt-0 text-black-20"
            >
              Maybe
            </Heading>
            <div className="mt-6 flex flex-col gap-6">
              {latesposts?.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-start">
                  <Image
                    src={getMediaURL(item)}
                    alt=""
                    width={100}
                    height={100}
                    className="w-[100px] h-[80px] rounded-[12px] object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {item?.date_gmt}
                    </span>
                    <h4 className="text-md font-medium text-[#2D2D2D] leading-snug">
                      {item?.title?.rendered}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
