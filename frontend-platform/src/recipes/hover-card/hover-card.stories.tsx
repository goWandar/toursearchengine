import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CalendarDays } from 'lucide-react';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-sm font-medium">N</span>
            </div>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@shadcn</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">S</span>
            </div>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">
              Building beautiful, accessible components for the web.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined March 2023
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SimpleText: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover for info</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Quick Info</h4>
          <p className="text-sm text-muted-foreground">
            This is a simple hover card with just text content.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ProductInfo: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost">MacBook Pro</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold">MacBook Pro 14-inch</h4>
              <p className="text-sm text-muted-foreground">M3 Pro chip</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm">
              Supercharged by M3 Pro chip for incredible performance.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium">Starting at $1,999</span>
              <span className="text-xs text-green-600">In Stock</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Small Card</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-48">
          <p className="text-sm">Compact hover card</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Large Card</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-96 p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Large Hover Card</h3>
            <p className="text-sm text-muted-foreground">
              This is a larger hover card with more content and padding.
              It can contain multiple paragraphs and more detailed information.
            </p>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">Additional footer content</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="text-sm">Positioned on top</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Right</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <p className="text-sm">Positioned on right</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          <p className="text-sm">Positioned on bottom</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Left</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <p className="text-sm">Positioned on left</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

