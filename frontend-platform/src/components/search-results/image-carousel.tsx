"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/recipes/button/button";

interface ImageCarouselProps {
    images: { imageUrls: string }[];
    title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    if (!images || images.length === 0) return null;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative w-full h-full">

            {/* Current image */}
            <div
                className="w-full h-full cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={images[current].imageUrls}
                    alt={title}
                    width={600}
                    height={380}
                    className="w-full h-full object-cover rounded-lg transition-all duration-300"
                    quality={100}
                />
            </div>

            {/* Navigation buttons (only if more than one image) */}
            {images.length > 1 && (
                <>
                    <Button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </>
            )}

            {/* Dots indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full cursor-pointer ${current === i ? "bg-white" : "bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Enlarged modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative max-w-5xl w-full mx-4">
                        <Button
                            className="absolute top-4 right-4 text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                        <Image
                            src={images[current].imageUrls}
                            alt={title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain rounded-lg"
                            quality={100}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
