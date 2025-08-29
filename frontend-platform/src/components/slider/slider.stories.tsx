import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Slider } from './slider';
import { ComponentProps, useState } from 'react';
import { Button } from '../button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../card/card';
import { Label } from '../label/label';
import { Badge } from '../badge/badge';
import { Separator } from '../separator/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { Alert, AlertDescription, AlertTitle } from '../alert/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';

import { DollarSign, Calendar, Users, Star, Info, Clock } from 'lucide-react';

type SliderProps = ComponentProps<typeof Slider>;

const meta: Meta<SliderProps> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A slider component built with Radix UI primitives. Allows users to select a value from a range by dragging a thumb along a track.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'object' },
      description: 'The default value of the slider.',
    },
    value: {
      control: { type: 'object' },
      description: 'The controlled value of the slider.',
    },
    min: {
      control: { type: 'number' },
      description: 'The minimum value of the slider.',
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum value of the slider.',
    },
    step: {
      control: { type: 'number' },
      description: 'The step increment of the slider.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled.',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: 'w-80',
  },
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: 'w-80',
  },
};

export const SafariTourBudget: Story = {
  render: () => {
    const [budget, setBudget] = useState([2500, 7500]);
    const [selectedTour, setSelectedTour] = useState<string | null>(null);

    const tourPackages = [
      { id: 'basic', name: 'Basic Safari', price: 2500, duration: '3 days', rating: 4.2 },
      { id: 'premium', name: 'Premium Safari', price: 5000, duration: '7 days', rating: 4.8 },
      { id: 'luxury', name: 'Luxury Safari', price: 7500, duration: '10 days', rating: 4.9 },
    ];

    const filteredTours = tourPackages.filter(
      (tour) => tour.price >= budget[0] && tour.price <= budget[1],
    );

    return (
      <div className="w-full max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Safari Tour Budget Range
            </CardTitle>
            <CardDescription>
              Select your budget range to find the perfect safari experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="budget-slider" className="flex items-center justify-between">
                Budget Range
                <div className="flex gap-2">
                  <Badge variant="outline">${budget[0].toLocaleString()}</Badge>
                  <span className="text-muted-foreground">-</span>
                  <Badge variant="outline">${budget[1].toLocaleString()}</Badge>
                </div>
              </Label>
              <Slider
                id="budget-slider"
                value={budget}
                onValueChange={setBudget}
                min={1000}
                max={10000}
                step={250}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$1,000</span>
                <span>$10,000</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Available Tours</Label>
                <Badge variant="secondary">{filteredTours.length} tours found</Badge>
              </div>

              {filteredTours.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No tours found</AlertTitle>
                  <AlertDescription>
                    Try adjusting your budget range to see more safari options.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTours.map((tour) => (
                    <Card
                      key={tour.id}
                      className={`cursor-pointer transition-colors hover:bg-accent ${
                        selectedTour === tour.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedTour(tour.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{tour.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{tour.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-lg font-semibold">
                            ${tour.price.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setBudget([1000, 10000])}>
              Reset Range
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={!selectedTour}>Book Selected Tour</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Booking</DialogTitle>
                  <DialogDescription>
                    You're about to book the{' '}
                    {filteredTours.find((t) => t.id === selectedTour)?.name} safari tour.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm Booking</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    );
  },
};

export const GroupSizeSelector: Story = {
  render: () => {
    const [groupSize, setGroupSize] = useState([4]);

    const getGroupDescription = (size: number) => {
      if (size <= 2) return 'Intimate experience';
      if (size <= 4) return 'Small group';
      if (size <= 8) return 'Medium group';
      return 'Large group';
    };

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Size
          </CardTitle>
          <CardDescription>Select the number of travelers for your safari</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              onValueChange={setGroupSize}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">1 person</span>
            <span className="text-muted-foreground">12 people</span>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Group Type: {getGroupDescription(groupSize[0])}
            </Label>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(groupSize[0], 6) }, (_, i) => (
                <Avatar key={i} className="h-8 w-8">
                  <AvatarFallback className="text-xs">{i + 1}</AvatarFallback>
                </Avatar>
              ))}
              {groupSize[0] > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{groupSize[0] - 6} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const SafariTimeRange: Story = {
  render: () => {
    const [timeRange, setTimeRange] = useState([6, 18]); // 6 AM to 6 PM

    const formatTime = (hour: number) => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:00 ${period}`;
    };

    const getDuration = () => {
      const duration = timeRange[1] - timeRange[0];
      return `${duration} hours`;
    };

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Safari Time Range
          </CardTitle>
          <CardDescription>Select your preferred safari hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="time-range" className="flex items-center justify-between">
              Time Range
              <div className="flex items-center gap-2">
                <Badge variant="outline">{formatTime(timeRange[0])}</Badge>
                <span className="text-muted-foreground">-</span>
                <Badge variant="outline">{formatTime(timeRange[1])}</Badge>
              </div>
            </Label>
            <Slider
              id="time-range"
              value={timeRange}
              onValueChange={setTimeRange}
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5:00 AM</span>
              <span>8:00 PM</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Duration:</span>
              <Badge variant="secondary">{getDuration()}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Best for:</span>
              <span className="text-muted-foreground">
                {timeRange[0] <= 6 && timeRange[1] >= 18
                  ? 'Full day safari'
                  : timeRange[0] <= 6
                  ? 'Morning safari'
                  : timeRange[1] >= 18
                  ? 'Evening safari'
                  : 'Custom timing'}
              </span>
            </div>
          </div>

          {(timeRange[0] <= 6 || timeRange[1] >= 18) && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {timeRange[0] <= 6 && timeRange[1] >= 18
                  ? 'Perfect for wildlife viewing during peak activity hours!'
                  : timeRange[0] <= 6
                  ? 'Great choice! Animals are most active in the early morning.'
                  : 'Excellent timing for sunset wildlife viewing.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full">Confirm Time Range</Button>
        </CardFooter>
      </Card>
    );
  },
};
