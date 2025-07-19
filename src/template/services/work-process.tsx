
import React from 'react';
import Image from 'next/image';
import Label from '@/components/ui/label';
import Heading from '@/components/ui/heading';
import List from '@/components/ui/list';
import Link from 'next/link';
import Button from '@/components/ui/button';

type Step = {
    title: string;
    description: string;
};

type TwoColumnSectionProps = {
    colorText?: string;
    label?: string;
    heading: string;
    text?: string;
    steps?: Step[];
    lists?: string[];
    mainImage: string;
    overlayImage?: string;
    reverse?: boolean;
    highlightImage?: boolean;
    buttonText?: string;
    buttonLink?: string;
    bgColor?: string;
    variant?: 'mission' | 'withSteps';
    overlayPosition?: 'left' | 'right';
};

function WorkProcess({
    colorText = '',
    label,
    heading,
    text,
    steps = [],
    lists = [],
    mainImage,
    overlayImage,
    reverse = false,
    highlightImage = false,
    buttonText,
    buttonLink,
    bgColor = '#EFF7FF',
    variant = 'withSteps',
    overlayPosition = 'right',
}: TwoColumnSectionProps) {
    const overlayClass =
        overlayPosition === 'left'
            ? 'absolute -left-6 bottom-10 sm:-left-14 sm:bottom-10 mx-auto'
            : 'absolute right-0 -bottom-10 sm:-right-0 sm:bottom-10';

    return (
        <section className={`bg-[${bgColor}]`}>
            <div className="container mx-auto px-4 py-14">
                <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center gap-10`}>
                    {/* Image */}
                    <div className={`w-full lg:w-1/2 relative mx-auto ${highlightImage ? 'bg-primary p-6 rounded-2xl' : ''}`}>
                        <Image
                            src={mainImage}
                            width={600}
                            height={600}
                            alt="Main image"
                            className="w-[90%] h-[551px] rounded-xl object-fill"
                        />
                        {overlayImage && (
                            <Image
                                src={overlayImage}
                                width={238}
                                height={274}
                                alt="Overlay"
                                className={`${overlayClass} border-2 border-amber-50 rounded-lg shadow-md w-[150px] sm:w-[238px]`}
                            />

                        )}
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 mx-auto">
                        {(variant === 'withSteps' || variant === 'mission') && label && (
                            <Label>{label}</Label>
                        )}

                        <Heading
                            colorText={colorText}
                            className="mt-3 text-black-20 !text-[40px] leading-tight"
                        >
                            {heading}
                        </Heading>

                        {variant === 'mission' && text && (
                            <p className="text-[20px] font-[400] mb-6">{text}</p>
                        )}

                        {steps.length > 0 && (
                            <div
                                className={
                                    variant === 'withSteps'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 py-8'
                                        : 'space-y-6 py-8'
                                }
                            >
                                {steps.map((step, index) => (
                                    <div key={index}>
                                        {variant === 'withSteps' ? (
                                            <>
                                                <span className="bg-[#7F9AD6] text-white py-2 px-4 rounded-full inline-block mb-2">
                                                    {index + 1}
                                                </span>
                                                <Heading colorText="" className="text-black-20 !text-[18px] mb-1">
                                                    {step.title}
                                                </Heading>
                                                <p className="text-sm text-gray-600 md:text-base -mt-1">
                                                    {step.description}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="!text-[20px] text-gray-600 md:text-base">
                                                    {step.description}
                                                </p>
                                                {lists[index] && (
                                                    <div className="mt-6">
                                                        <List>{lists[index]}</List>
                                                    </div>
                                                )}
                                                
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {variant === 'mission' && buttonText && buttonLink && (
                            <div className="w-60 mt-10">
                                <Button
                                    href={buttonLink}
                                    className="font-bold text-[14px] sm:text-[18px] text-light border-2 border-primary bg-primary px-2 sm:px-7 py-[16px] rounded-full"
                                >
                                    {buttonText}
                                </Button>
                            </div>
                        )}
                        
                    </div>

                </div>
            </div>
        </section >
    );
}


export default WorkProcess;