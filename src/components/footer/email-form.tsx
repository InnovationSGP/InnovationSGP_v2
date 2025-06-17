import Image from 'next/image'
import React from 'react'

const EmailForm = () => {
  return (
    <div className="bg-white p-[11px] pl-6 flex items-center w-full mt-4 rounded-l-[4px] rounded-r-[30px]">
                    <input placeholder="Enter Email" className="w-full outline-none border-none" />
                    <Image
                      src={"/svg/email-button.svg"}
                      alt=""
                      width={38}
                      height={38}
                    />
                  </div>
  )
}

export default EmailForm