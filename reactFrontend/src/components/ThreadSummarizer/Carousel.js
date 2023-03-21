import React from "react";

export default function Carousel({ media_urls }) {
    return (
        <>
            {media_urls ? (
                <div className="carousel carousel-center rounded-box">
                    {media_urls.map((item) => (
                        <div className="carousel-item h-80">
                            <img src={item.url} alt="thread_image" />
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
