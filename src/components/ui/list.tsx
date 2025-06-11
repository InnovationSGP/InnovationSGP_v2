import Image from "next/image";
import React from "react";

const List = ({ children }: any) => {
  return (
    <>
      <li className="text-text flex items-center gap-3">
        <Image
          src={"/svg/list.svg"}
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
        <span>{children}</span>
      </li>
    </>
  );
};

export default List;
