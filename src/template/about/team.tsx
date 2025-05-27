import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import React from 'react';

const teamMembers = [
    {
        name: 'Thomas Wilson',
        role: 'CEO & Founder',
        image: '/images/Thomas-Wilson.png',
    },
      {
        name: 'Thomas Wilson',
        role: 'CEO & Founder',
        image: '/images/Thomas-Wilson.png',
    },
      {
        name: 'Thomas Wilson',
        role: 'CEO & Founder',
        image: '/images/Thomas-Wilson.png',
    },
      {
        name: 'Thomas Wilson',
        role: 'CEO & Founder',
        image: '/images/Thomas-Wilson.png',
    },
];

function Team() {
    return (
        <section className='container mx-auto px-4 py-20'>
            <div className='text-center mb-12'>
                <Label>Just A Consultancy</Label>
                <Heading colorText='Members' className="mt-3 text-black-20">
                    Expert Team
                </Heading>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="w-full h-96 bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden relative flex items-end py-6 justify-center text-white text-center"
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0, 2, 60, 2.9), rgba(0, 0, 0, 0)), url(${member.image})`,
                        }}
                    >
                        <div className="z-10 px-4">
                            <h3 className="text-xl font-semibold py-2">{member.name}</h3>
                            <p className="text-sm px-3 py-1 rounded-md bg-blue-300/10 backdrop-blur-sm inline-block ">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Team;
