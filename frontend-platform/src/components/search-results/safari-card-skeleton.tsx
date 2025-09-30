import { Card, CardContent, CardTitle } from '@/recipes/card/card';
import React from 'react';
import { Skeleton } from '@/recipes/skeleton/skeleton';

const SafariCardSkeleton = () => {
    return (
        <Card className="w-full overflow-hidden">
            {/* Header with image placeholder */}
            <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <Skeleton className="absolute top-4 left-4 h-6 w-20" />
                <Skeleton className="absolute top-4 right-4 h-6 w-20" />
                <Skeleton className="w-full h-full object-cover rounded-lg" />
            </div>

            <CardContent className="p-6">
                {/* Title and Location */}
                <CardTitle>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                </CardTitle>
                <Skeleton className="h-4 w-1/2 mb-3" />

                {/* Description */}
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-5/6 mb-4" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>

                {/* Duration and Accommodation */}
                <div className="flex items-center gap-6 mb-4 text-sm">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Accordion for Included/Excluded */}
                <div className="mb-4 space-y-2">
                    <Skeleton className="h-8 w-full rounded-lg" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-end justify-between">
                    <div>
                        <Skeleton className="h-6 w-24 mb-1" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-36" />
                </div>
            </CardContent>
        </Card>
    );
}

export default SafariCardSkeleton;
