import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/recipes/accordion/accordion';
import { Button } from '@/recipes/button/button';
import { Card, CardContent, CardTitle } from '@/recipes/card/card';
import { Tour } from '@/types/types';
import { useState } from 'react'
import { filterPricesBySeason, formatSeasonPeriod, getPriceForGroupSize, getUniqueSeasons } from '@/utils/free-search.utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/recipes/select/select';
import ImageCarousel from './image-carousel';
import Image from 'next/image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/recipes/hover-card/hover-card';

interface ModernSafariCardProps {
    data: Tour;
    showCarousel: boolean;
};

const ModernSafariCard = ({ data, showCarousel = false }: ModernSafariCardProps) => {
    const uniqueSeasons = getUniqueSeasons(data.prices);
    const [season, setSeason] = useState<string | null>(uniqueSeasons[0] ?? null)
    const seasonFilteredPrices = filterPricesBySeason(data.prices, season);
    const minPeople = Math.min(...data.prices.map(p => p.numOfPeople));
    const maxPeople = Math.max(...data.prices.map(p => p.numOfPeople));
    const [groupSize, setGroupSize] = useState([minPeople]);
    const currentPrice = getPriceForGroupSize(seasonFilteredPrices, groupSize[0]);

    return (
        <Card className="w-full overflow-hidden">
            {/* Tour Images*/}
            <div className="relative h-52 bg-gray-200 flex items-center justify-center">
                {data.images?.length > 0 ? (
                    showCarousel ?
                        (<ImageCarousel images={data.images} title={data.title} />) :
                        (
                            <div
                                className="w-full h-full cursor-pointer"
                            >
                                <Image
                                    src={data.images[0].imageUrls}
                                    alt={data.title}
                                    width={600}
                                    height={380}
                                    className="w-full h-full object-cover rounded-lg transition-all duration-300"
                                    quality={100}
                                />
                            </div>
                        )
                ) : (
                    // Image Placeholder
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">

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

            {/* Main Tour Content */}
            <CardContent className="p-6">
                {/* Title */}
                <CardTitle className="text-xl font-bold mb-4">{data.title}</CardTitle>

                {/* Safari Seasons Select*/}
                {/* <div className="flex flex-col mb-4 justify-center">

                    {uniqueSeasons.length > 0 && (
                        <Select
                            onValueChange={(value) => setSeason(value)}
                            value={season ?? ""}
                        >
                            <SelectTrigger className="w-full font-medium">
                                <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueSeasons.map((s) => {
                                    const seasonData = data.prices.find((p) => p.seasonName === s)
                                    const formatted = formatSeasonPeriod(seasonData?.seasonPeriod ?? "")
                                    return (
                                        <SelectItem key={s} value={s ?? ""}>
                                            {s} ({formatted})
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    )
                    }
                </div> */}

                <div className='flex flex-row justify-between items-center'>
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
                        {/* Accomodation with hover card for more info */}
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{data.accommodationType}</span>
                                </div>
                            </HoverCardTrigger>
                            {data.accommodationType === "mixed" && (
                                <HoverCardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Mix of <span className='font-bold'>lodges</span> and <span className='font-bold'>camps</span> for a varied safari adventure.
                                        </p>
                                    </div>
                                </HoverCardContent>
                            )}
                        </HoverCard>
                    </div>

                    {/* Pricing */}
                    <div className='flex flex-col mb-4'>
                        {currentPrice &&
                            <div className="text-2xl font-bold text-green-800">
                                ${currentPrice.pricePerPerson.toLocaleString()}
                            </div>}
                        <div className="text-sm text-gray-600">per person</div>
                    </div>
                </div>

                {/* What's Included/Excluded using Accordion */}
                <div className="mb-4">
                    {/* What's Included */}
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

                        {/* What's Excluded */}
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

                <div className="flex items-end justify-between">
                    {/* Operator Profile Redirection Button */}
                    <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white px-5">
                        <a target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Operator Profile
                        </a>
                    </Button>

                    {/* Tour Site Redirection Button */}
                    <Button asChild className="bg-white text-black px-5 border" variant="link">
                        <a href={data.siteURL!} target="_blank" rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Box */}
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                />
                                {/* Arrow */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14"
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