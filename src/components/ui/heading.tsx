import React from 'react'

const Heading = ({children, variant, secondColor, colorText, className}:any) => {
  return (
    <h2 className={`text-5xl font-bold capitalize 
        ${variant === 'large' ? 'text-2xl sm:text-4xl text-white md:text-[64px] md:leading-[70px]' : 'text-2xl sm:text-3xl md:text-5xl md:leading-[56px]'} 
        ${className}
    `}>
        {children}
        <span className={secondColor === 'blue' ? 'text-blue-30' : 'text-blue-30'}>{" "}{colorText}</span>
    </h2>
  )
}

export default Heading