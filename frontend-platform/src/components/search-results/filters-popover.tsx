import { Button } from '@/recipes/button/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/recipes/popover/popover'
import { Slider } from '@/recipes/slider/slider'
import { ResultsStateType } from '@/types/free-search.types'
import { ChevronDown, Filter, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface FiltersPopoverProps {
    filters: {
        budget: [number, number];
        duration: [number, number];
        accommodation: string[];
    };
    setFilters: (filters: {
        budget: [number, number];
        duration: [number, number];
        accommodation: string[];
    }) => void;
    handleApplyFilters: () => void;
    handleResetFilters: () => void;
    resultsState: ResultsStateType
}

const FiltersPopover = ({
    filters,
    setFilters,
    handleApplyFilters,
    handleResetFilters,
    resultsState
}: FiltersPopoverProps
) => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const accommodationTypes = [
        { displayName: "Mixed", name: "mixed" },
        { displayName: "Lodge", name: "lodge" },
        { displayName: "Camp", name: "camp" },];

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    disabled={resultsState === "loading"}
                    variant="outline"
                    className="flex items-center space-x-2 bg-white shadow-sm border-gray-200 hover:bg-gray-50 rounded-full px-6"
                >
                    <Filter className="h-4 w-4" />
                    <span className='text-xs sm:text-sm'>Filters</span>
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="end">
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Refine Results</h3>

                    {/* Budget Filter */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">Budget (USD/person)</h4>
                        <Slider
                            value={filters.budget}
                            onValueChange={(value) => setFilters({ ...filters, budget: [value[0], value[1]] })}
                            max={20000}
                            min={100}
                            step={100}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>${filters.budget[0]}</span>
                            <span>${filters.budget[1]}</span>
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">
                            Duration (days)
                        </h4>
                        <Slider
                            value={filters.duration}
                            onValueChange={(value) => setFilters({ ...filters, duration: [value[0], value[1]] })}
                            max={14}
                            min={1}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{filters.duration[0]} days</span>
                            <span>{filters.duration[1]} days</span>
                        </div>
                    </div>

                    {/* Accommodation Filter */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">
                            Accommodation Type
                        </h4>
                        <div className="space-y-2">
                            {accommodationTypes.map((type) => (
                                <div key={type.displayName} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={type.displayName}
                                        checked={filters.accommodation.includes(type.name)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, accommodation: [...filters.accommodation, type.name] })
                                            } else {
                                                setFilters({
                                                    ...filters,
                                                    accommodation: filters.accommodation.filter((a) => a !== type.name),
                                                })
                                            }
                                        }}
                                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                    />
                                    <label htmlFor={type.displayName} className="text-sm cursor-pointer">
                                        {type.displayName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => {
                                handleResetFilters();
                                setIsPopoverOpen(false);
                            }}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                handleApplyFilters();
                                setIsPopoverOpen(false);
                            }}>
                            <Filter className="mr-2 h-4 w-4" />
                            Apply
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default FiltersPopover