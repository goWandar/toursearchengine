import { Select, SelectContent, SelectItem, SelectTrigger } from '@/recipes/select/select'
import { ResultsStateType, SortToursType } from '@/types/free-search.types';
import { SortDescIcon } from 'lucide-react'

interface SortSelectProps {
    handleSortTours?: (value: SortToursType) => void;
    sortBy: SortToursType;
    resultsState: ResultsStateType
}

const SortSelect = ({
    handleSortTours,
    sortBy,
    resultsState
}: SortSelectProps
) => {
    return (
        <div className='max-w-[180px]'>
            <Select disabled={resultsState === "loading"} value={sortBy} onValueChange={(value: SortToursType) => handleSortTours && handleSortTours(value)}>
                <SelectTrigger className="flex items-center space-x-2 bg-white shadow-sm border-gray-200 hover:bg-gray-50 rounded-full px-6">
                    <SortDescIcon className="h-4 w-4" /> Sort By
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        value="default"
                        onClick={() => handleSortTours && handleSortTours("default")}
                    >
                        Default
                    </SelectItem>

                    <SelectItem
                        value="duration_short_long"
                        onClick={() => handleSortTours && handleSortTours("duration_short_long")}
                    >
                        Duration: Short to Long
                    </SelectItem>

                    <SelectItem
                        value="duration_long_short"
                        onClick={() => handleSortTours && handleSortTours("duration_long_short")}
                    >
                        Duration: Long to Short
                    </SelectItem>

                    <SelectItem
                        value="budget_low_high"
                        onClick={() => handleSortTours && handleSortTours("budget_low_high")}
                    >
                        Budget: Low to High
                    </SelectItem>

                    <SelectItem
                        value="budget_high_low"
                        onClick={() => handleSortTours && handleSortTours("budget_high_low")}
                    >
                        Budget: High to Low
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortSelect