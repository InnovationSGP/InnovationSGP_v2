import React from "react";

const Heading = ({
  children,
  variant,
  secondColor,
  colorText,
  className,
  ...rest
}: any) => {
  return (
    <h2
      className={`font-bold capitalize 
        ${
          variant === "large"
            ? "text-2xl sm:text-4xl text-white md:text-[64px] md:!leading-[70px]"
            : "text-[22px] !leading-[30px] sm:text-3xl md:text-5xl md:!leading-[56px]"
        } 
        ${className}
    `}
      {...rest}
    >
      {children}
      <span
        className={secondColor === "gary" ? "text-gray-300/80" : "text-blue-30"}
      >
        {" "}
        {colorText}
      </span>
    </h2>
  );
};

export default Heading;
