import React from "react";

export default function Carousel({ thread }) {
    return (
        <div className="carousel carousel-center rounded-box">
            {thread.details["references"]["images"].map((item, id, images) => (
                <div className="carousel-item h-80" id={id}>
                    <img src={item} alt="Pizza" />
                </div>
            ))}
        </div>
    );
}
