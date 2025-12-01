import { useState, useEffect } from 'react'
import { GroupSizeSelector } from './group-size-selector'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

interface DynamicPricingProps {
    idParam: number;
    typeParam: string;
    searchParams: any;
}

const DynamicPricing = ({ idParam, typeParam, searchParams }: DynamicPricingProps) => {
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
            idParam,
            typeParam,
            searchParams,
            router,
            priceBy: { persons: value },
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
            />
        </div>
    )
}

export default DynamicPricing
