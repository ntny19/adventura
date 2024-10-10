import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function Carousel({ slides }) { 
    const [currentIndex, setCurrentIndex] = useState(0); 
    const itemsPerPage = 3; 

    const nextSlide = () => {
        if (currentIndex + itemsPerPage < slides.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevSlide = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <div className="w-[85%] m-auto py-5 mt-10">
            <p className="text-2xl text-black rounded-xl font-bold">Places you should visit next</p>
            <div className="relative flex justify-center items-center h-[450px]">
                {/* Left Button */}
                <button
                    type="button"
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className={`absolute top-1/2 transform -translate-y-1/2 left-[-50px] bg-[#57a1cc] p-2 rounded-full text-white hover:bg-[#3776DB]`}
                >
                    <ArrowLeftIcon aria-hidden="true" className="h-10 w-10" />
                </button>

                <div className="flex gap-10 h-[300px]">
                    {/*Slice*/}
                    {slides.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                        <div key={index} className="bg-white w-[300px] text-black rounded-xl shadow-lg hover:shadow-xl">
                            <div className="relative rounded-t-xl h-[60%] w-full overflow-hidden">
                                <img src={item.cityavatar} alt={`Slide ${index}`} className="h-full w-full object-cover"/>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-4 p-4 text-xl font-semibold">
                                <p>{item.cityname}</p>
                                <p>CountryA</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Button */}
                <button
                    type="button"
                    onClick={nextSlide}
                    disabled={currentIndex + itemsPerPage >= slides.length}
                    className={`absolute right-[-50px] top-1/2 transform -translate-y-1/2 rounded-full bg-[#57a1cc] p-1 text-white hover:bg-[#3776DB]`}
                >
                    <ArrowRightIcon aria-hidden="true" className="h-10 w-10" />
                </button>
            </div>
        </div>
    );
}


export default Carousel;