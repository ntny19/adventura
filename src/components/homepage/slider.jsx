import React, { useState, useEffect } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

function Slider({ slides }) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [nextSlideIndex, setNextSlideIndex] = useState(currentSlide); 

    const animationDuration = 500;
    const autoSlideInterval = 3000;

    const nextSlide = () => {
        if (fadeOut || fadeIn) return; 
        setFadeOut(true);
        setNextSlideIndex((currentSlide + 1) % slides.length);

        // Change to the next slide after fade out completes
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setFadeOut(false); // Reset fadeOut state for the next transition
            setFadeIn(true); // Start fade in the new slide
            setTimeout(() => setFadeIn(false), animationDuration); // Reset fadeIn after duration
        }, animationDuration); 
    };

    const prevSlide = () => {
        if (fadeOut || fadeIn) return; // Prevent clicking during animation
        setFadeOut(true);
        
        // Set the next slide index
        setNextSlideIndex((currentSlide - 1 + slides.length) % slides.length);

        // Change to the previous slide after fade out completes
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setFadeOut(false); // Reset fadeOut state for the next transition
            setFadeIn(true); // Start fade in the new slide
            setTimeout(() => setFadeIn(false), animationDuration); // Reset fadeIn after duration
        }, animationDuration); 
    };

    useEffect(() => {
        //if (slides.length === 0) return;
        const interval = setInterval(() => {
            nextSlide(); // Automatically move to the next slide every 3 seconds
        }, autoSlideInterval);

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, [currentSlide]); // Dependency array ensures it runs again after every slide change

    return (
        <div className="relative">
            {slides.length > 0 ? (
            <div className="flex h-[400px] overflow-hidden rounded-none">
                {/* Current Slide */}
                <img
                    src={slides[currentSlide]?.cityavatar}
                    alt={`Slide ${slides[currentSlide]?.cityname}`}
                    className={`h-full w-full object-cover transition-opacity duration-${animationDuration} ${fadeOut ? 'opacity-0' : 'opacity-100'}`} 
                />
                
                {/* Next Slide */}
                <img
                    src={slides[nextSlideIndex]?.cityavatar} 
                    alt={`Slide ${slides[nextSlideIndex]?.cityname}`}
                    className={`absolute top-0 h-full w-full object-cover transition-opacity duration-${animationDuration} ${fadeIn ? 'opacity-100' : 'opacity-0'}`} 
                />
            </div>): (
                <p>No slides available</p> 
            )}

            <button
                type="button"
                onClick={prevSlide}
                disabled={fadeOut || fadeIn}
                className={`rounded-full bg-[#57a1cc] p-1 text-white hover:bg-[#3776DB] absolute left-10 top-1/2 transform -translate-y-1/2 ${fadeOut || fadeIn ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <ArrowLeftCircleIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                disabled={fadeOut || fadeIn}
                className={`rounded-full bg-[#57a1cc] p-1 text-white hover:bg-[#3776DB] absolute right-10 top-1/2 transform -translate-y-1/2 ${fadeOut || fadeIn ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <ArrowRightCircleIcon aria-hidden="true" className="h-6 w-6" />
            </button>
        </div>
    );
}

export default Slider;