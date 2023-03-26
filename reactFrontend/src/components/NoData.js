import React from "react";
import empty from "../images/empty.jpg"

const NoData = () => (
    <>
        <div className="text-3xl w-full mx-auto font-extrabold">
            <span className="relative text-gray-500 top-[8rem] text-center z-20">Nothing to show</span>  
            <img className="opacity-30  mx-auto" src={empty} width="250"/>
        </div>
    </>
)

export default NoData ; 