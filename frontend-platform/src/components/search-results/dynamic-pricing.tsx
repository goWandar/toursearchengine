import { useState, useEffect } from 'react'
import { GroupSizeSelector } from './group-size-selector'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { ExperienceDestinationType } from '@/types/free-search.types';

interface DynamicPricingProps {
    searchItemId: number;
    searchItemType: string;
    searchParams: any;
    isLoading: boolean;
    destinationData: ExperienceDestinationType | undefined;
}

const DynamicPricing = ({ searchItemId, searchItemType, searchParams, isLoading, destinationData }: DynamicPricingProps) => {
    const router = useRouter();
    const setNumberOfPersons = useFiltersStore((state) => state.setNumberOfPersons);
    const pricedBy = useFiltersStore((state) => state.pricedBy);

    // Local state for slider UI
    const [sliderValue, setSliderValue] = useState(pricedBy.persons);

    // Update slider if pricedBy.persons changes externally
    useEffect(() => {
        setSliderValue(pricedBy.persons);
    }, [pricedBy.persons]);

    // Debounced store / fetch update
    const debouncedHandleGroupSizeChange = useDebouncedCallback((value: number) => {
        setNumberOfPersons({
            idParam: searchItemId,
            typeParam: searchItemType,
            searchParams,
            router,
            priceBy: { persons: value },
            destinationData: searchItemType === "experience" ? destinationData : undefined,
        });
    }, 800);

    // Handler for the slider
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]);
        debouncedHandleGroupSizeChange(value[0]);
    };

    return (
        <div>
            {/* Group Size Selector */}
            <GroupSizeSelector
                groupSize={[sliderValue]}
                onGroupSizeChange={handleSliderChange}
                minPeople={2}
                maxPeople={4}
                isLoading={isLoading}
            />
        </div>
    )
}

export default DynamicPricing
