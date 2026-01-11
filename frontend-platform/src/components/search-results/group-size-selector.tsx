import { Badge } from '@/recipes/badge/badge';
import { Label } from '@/recipes/label/label';
import { Slider } from '@/recipes/slider/slider';

interface GroupSizeSelectorProps {
    groupSize: number[];
    onGroupSizeChange: (value: number[]) => void;
    minPeople: number;
    maxPeople: number;
    isLoading?: boolean;
}

export const GroupSizeSelector = ({
    groupSize,
    onGroupSizeChange,
    minPeople,
    maxPeople,
    isLoading
}: GroupSizeSelectorProps) => {

    return (
        <div className="mb-6 space-y-3 xl:max-w-88">
            {/* <CardDescription>Select the number of travelers for your safari</CardDescription> */}

            <div className="space-y-2">
                <Label htmlFor="group-slider" className="flex items-center justify-between font-medium">
                    Number of Travelers ?
                    <Badge variant="secondary">
                        {groupSize[0]} {groupSize[0] === 1 ? 'person' : 'people'}
                    </Badge>
                </Label>

                <Slider
                    disabled={isLoading}
                    id="group-slider"
                    value={groupSize}
                    onValueChange={onGroupSizeChange}
                    min={minPeople}
                    max={maxPeople}
                    step={1}
                    className="w-full"
                />
            </div>

            <div className="flex items-center justify-between text-xs gap-2">
                <span className="w-7 h-6 flex items-center justify-center text-muted-foreground bg-muted rounded-full">
                    {minPeople}
                </span>
                <span className="w-7 h-6 flex items-center justify-center text-muted-foreground bg-muted rounded-full">
                    {maxPeople}
                </span>
            </div>
        </div>
    );
};
