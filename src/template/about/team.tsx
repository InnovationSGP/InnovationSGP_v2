import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import { getMediaURL } from '@/utils';
import React from 'react';


function Team({data}:any) {
    console.log(data)
    return (
        <section className='container mx-auto px-4 py-20'>
            <div className='text-center mb-12'>
                <Label>Innovators</Label>
                <Heading colorText='Team' className="mt-3 text-black-20">
                    Expert
                </Heading>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
                {data
                    ?.filter((member: any) => member.acf?.member_orgChartKey === "1")
                    .map((member: any, index: number) => (
                        <div
                            key={index}
                            className="w-full h-96 bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden relative flex items-end py-6 justify-center text-white text-center"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 2, 60, 2.9), rgba(0, 0, 0, 0)), url(${getMediaURL(member)})`,
                            }}
                        >
                            <div className="z-10 px-4">
                                <h3 className="text-xl font-semibold py-2">{member.title?.rendered}</h3>
                                <p className="text-sm px-3 py-1 rounded-md bg-blue-300/10 backdrop-blur-sm inline-block ">
                                    {member.acf.member_designation}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {data
                    ?.filter((member: any) => member.acf?.member_orgChartKey !== "1")
                    .sort((a: any, b: any) => {
                        const keyA = parseInt(a.acf?.member_orgChartKey) || 0;
                        const keyB = parseInt(b.acf?.member_orgChartKey) || 0;
                        return keyA - keyB;
                    })
                    .map((member: any, index: number) => (
                        <div
                            key={index}
                            className="w-full h-96 bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden relative flex items-end py-6 justify-center text-white text-center"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 2, 60, 2.9), rgba(0, 0, 0, 0)), url(${getMediaURL(member)})`,
                            }}
                        >
                            <div className="z-10 px-4">
                                <h3 className="text-xl font-semibold py-2">{member.title?.rendered}</h3>
                                <p className="text-sm px-3 py-1 rounded-md bg-blue-300/10 backdrop-blur-sm inline-block ">
                                    {member.acf.member_designation}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>        </section>
    );
}

export default Team;
