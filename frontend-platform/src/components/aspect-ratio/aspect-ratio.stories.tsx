import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AspectRatio } from './aspect-ratio';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card/card';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { Label } from '../label/label';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for maintaining consistent aspect ratios, perfect for safari tour images and media content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The desired aspect ratio (width / height)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with safari landscape image
export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args}>
        <div className="rounded-md bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center h-full">
          <div className="text-center p-6">
            <div className="text-4xl mb-2">🦁</div>
            <h3 className="font-semibold text-lg">Serengeti National Park</h3>
            <p className="text-sm text-muted-foreground">Home of the Great Migration</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

// Safari tour card with aspect ratio image
export const SafariTourCard: Story = {
  args: {
    ratio: 4 / 3,
  },
  render: (args) => (
    <Card className="w-[380px] overflow-hidden">
      <AspectRatio {...args}>
        <div className="relative bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 flex items-center justify-center h-full">
          <div className="absolute top-4 left-4">
            <Badge variant="success" className="text-xs">Big Five Safari</Badge>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">4.9</span>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-3">🐘</div>
            <h3 className="font-bold text-xl text-gray-800">Masai Mara</h3>
            <p className="text-sm text-gray-600">Kenya's Premier Game Reserve</p>
          </div>
        </div>
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base font-semibold">5-Day Big Five Safari</Label>
          <Badge variant="outline">Available</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Experience the incredible wildlife of Masai Mara with our expert guides. Witness the Big Five and the Great Migration.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">$1,250</span>
            <span className="text-sm text-muted-foreground">/person</span>
          </div>
          <Button>Book Safari</Button>
        </div>
      </CardContent>
    </Card>
  ),
};

// Tour operator profile with aspect ratio avatar section
export const TourOperatorProfile: Story = {
  args: {
    ratio: 21 / 9, // Ultra-wide banner ratio
  },
  render: (args) => (
    <Card className="w-[500px] overflow-hidden">
      <AspectRatio {...args}>
        <div className="relative bg-gradient-to-r from-teal-100 via-blue-50 to-green-100 flex items-center justify-center h-full">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center gap-6 px-8">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Safari Guide" />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">Masai Mara Experts</h3>
              <p className="text-gray-600">Premium Safari Operator</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="info">Licensed Guide</Badge>
                <Badge variant="success">5★ Rated</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-1">🏆</div>
              <Label className="text-sm font-medium">Award Winner</Label>
            </div>
          </div>
        </div>
      </AspectRatio>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-teal-600">500+</div>
            <Label className="text-sm text-muted-foreground">Safaris Completed</Label>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">15</div>
            <Label className="text-sm text-muted-foreground">Years Experience</Label>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">98%</div>
            <Label className="text-sm text-muted-foreground">Success Rate</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button className="flex-1">View Tours</Button>
        <Button variant="outline" className="flex-1">Contact Guide</Button>
      </CardFooter>
    </Card>
  ),
};