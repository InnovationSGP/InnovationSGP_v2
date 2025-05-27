import Heading from '@/components/ui/heading'
import Image from 'next/image'
import React from 'react'

const suggestions = [
    {
        image: '/images/internet.png',
        date: 'Nov 10, 2021',
        title: 'How To Make Money From Internet'
    },
    {
        image: '/images/internet.png',
        date: 'Nov 10, 2021',
        title: 'Tips To Saving Money In Pandemic'
    },
    {
        image: '/images/internet.png',
        date: 'Nov 10, 2021',
        title: 'Tips Business For Make Saving'
    },
    {
        image: '/images/internet.png',
        date: 'Nov 10, 2021',
        title: 'Tips Saving Money For Business'
    }
]

function Hero() {
    return (
        <section className='bg-gradient-to-b from-[#EFF7FF] to-white pt-24'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    {/* Left Content */}
                    <div className='w-full lg:w-2/3'>
                        <Image
                            src='/images/blog-read.png'
                            alt="Main Article"
                            width={500}
                            height={500}
                            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[25px]"
                        />
                        <Heading colorText='Internet For Business' className="mt-10 text-black-20">
                            How To Make Money From
                        </Heading>
                        {/* Paragraphs */}
                        {[
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                            "Duis aute irure dolor in reprehenderit in voluptate velit esse...",
                            "Sed ut perspiciatis unde omnis iste natus error...",
                            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur...",
                            "Neque porro quisquam est, qui dolorem ipsum quia dolor...",
                            "Ut enim ad minima veniam, quis nostrum exercitationem...",
                            "But I must explain to you how all this mistaken idea...",
                            "No one rejects, dislikes, or avoids pleasure itself...",
                            "Nor again is there anyone who loves or pursues pain...",
                        ].map((text, i) => (
                            <p key={i} className={`text-[#2D2D2D] ${i % 2 === 0 ? 'py-3' : 'pb-3'}`}>
                                {text}
                            </p>
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className='w-full lg:w-1/3'>
                        <Heading colorText='You Like' className="mt-10 text-black-20">
                            Maybe 
                        </Heading>
                        <div className="mt-6 flex flex-col gap-6">
                            {suggestions.map((item, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={100}
                                        height={100}
                                        className="w-[100px] h-[80px] rounded-[12px] object-cover flex-shrink-0"
                                    />
                                    <div className='flex flex-col'>
                                        <span className='text-sm text-gray-500'>{item.date}</span>
                                        <h4 className='text-md font-medium text-[#2D2D2D] leading-snug'>
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
