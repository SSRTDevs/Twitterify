import React from "react"

const InfoCard = ({title, children}) => (
    <div className="h-auto w-full checker-bg rounded-lg border border-base-300 p-4 mt-3">
        <div className="w-full text-2xl">{title}</div>
        {children}
    </div>
)

export default InfoCard ; 