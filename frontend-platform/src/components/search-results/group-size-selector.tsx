import { Badge } from '@/recipes/badge/badge';
import { CardDescription } from '@/recipes/card/card';
import { Label } from '@/recipes/label/label';
import { Slider } from '@/recipes/slider/slider';

interface GroupSizeSelectorProps {
    groupSize: number[];
    onGroupSizeChange: (value: number[]) => void;
    minPeople: number;
    maxPeople: number;
}

export const GroupSizeSelector = ({
    groupSize,
    onGroupSizeChange,
    minPeople,
    maxPeople
}: GroupSizeSelectorProps) => {

    return (
        <div className="mb-6 space-y-3">
            <CardDescription>Select the number of travelers for your safari</CardDescription>

            <div className="space-y-2">
                <Label htmlFor="group-slider" className="flex items-center justify-between">
                    Number of Travelers
                    <Badge variant="secondary">
                        {groupSize[0]} {groupSize[0] === 1 ? 'person' : 'people'}
                    </Badge>
                </Label>

                <Slider
                    id="group-slider"
                    value={groupSize}
                    onValueChange={onGroupSizeChange}
                    min={minPeople}
                    max={maxPeople}
                    step={1}
                    className="w-full"
                />
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{minPeople} {minPeople > 1 ? 'people' : 'person'}</span>
                <span className="text-muted-foreground">{maxPeople} {maxPeople > 1 ? 'people' : 'person'}</span>
            </div>
        </div>
    );
};
