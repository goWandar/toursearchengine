import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/recipes/accordion/accordion';
import { Badge } from '@/recipes/badge/badge';
import { Button } from '@/recipes/button/button';
import { Card, CardContent, CardTitle } from '@/recipes/card/card';
import { Tour } from '@/types/types';
import Image from 'next/image';
import React from 'react'
import ImageSlider from './image-slider';

const ModernSafariCard = ({
    data
}: { data: Tour }) => {
    return (
        <Card className="w-full overflow-hidden">
            {/* Header with image placeholder and rating */}
            <div className="relative h-52 bg-gray-200 flex items-center justify-center">
                {/* <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    <span>Safari</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    <span className="text-yellow-500">★</span>
                    <span>4.8 (247)</span>
                </div> */}
                {/* Image placeholder */}
                {data.images?.length > 0 ? (
                    <ImageSlider images={data.images} title={data.title} />
                )
                    :
                    (<div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">

                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>)}
            </div>

            <CardContent className="p-6">
                {/* Title and Location */}
                <CardTitle className="text-xl font-bold mb-2">{data.title}</CardTitle>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="info" className="text-xs">Big 5</Badge>
                    <Badge variant="info" className="text-xs">Great Migration</Badge>
                    <Badge variant="info" className="text-xs">Cultural Experience</Badge>
                </div>

                {/* Duration and Accommodation */}
                <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {data.durationInDays} {data.durationInDays === 1 ? "day" : "days"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{data.accommodationType}</span>
                    </div>
                </div>

                {/* what&apos;s Included/Excluded using Accordion */}
                <div className="mb-4">
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="included" className="border border-green-200 rounded-lg mb-2 bg-green-50">
                            <AccordionTrigger className="px-3 py-2 text-green-700 font-medium hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    What&apos;s Included
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-3 pb-2">
                                <ul className="text-sm space-y-1 text-green-700">
                                    {(data.included?.split('\n') || []).map((item, index) => {
                                        if (!item.trim()) return null;
                                        return <li key={index}>• {item.trim()}</li>;
                                    })}
                                </ul>

                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="excluded" className="border border-red-200 rounded-lg bg-red-50">
                            <AccordionTrigger className="px-3 py-2 text-red-700 font-medium hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    What&apos;s Excluded
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-3 pb-2">
                                <ul className="text-sm space-y-1 text-red-700">
                                    {(data.excluded?.split('\n') || []).map((item, index) => {
                                        if (!item.trim()) return null;
                                        return <li key={index}>• {item.trim()}</li>;
                                    })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Operator Site & Operator Profile Redirection */}
                <div className="flex items-end justify-between">
                    {/* <div>
                        <div className="text-2xl font-bold">$350-450/day</div>
                        <div className="text-sm text-gray-600">per person</div>
                    </div> */}

                    <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white px-5">
                        <a href={data.siteURL!} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Operator Profile
                        </a>
                    </Button>
                    <Button asChild className="bg-white text-black px-5 border" variant="link">
                        <a
                            href={data.siteURL!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Box */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                />
                                {/* Arrow */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 3h7v7m0-7L10 14"
                                />
                            </svg>
                            Visit Site
                        </a>
                    </Button>

                </div>
            </CardContent>
        </Card>
    )
}

export default ModernSafariCard;