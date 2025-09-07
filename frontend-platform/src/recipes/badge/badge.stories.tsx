import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';
import { Button } from '../button/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card/card';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';
import { User, Crown, Shield, MessageSquare, Star, ShoppingCart, Check } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'warning', 'success', 'info'],
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// All variants showcase - matching Alert component variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

// Status badges using semantic variants
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="info">Draft</Badge>
      <Badge variant="default">Normal</Badge>
    </div>
  ),
};

export const Default: Story = {
  args: { children: 'Default', variant: 'default' },
};

export const Destructive: Story = {
  args: { children: 'Destructive', variant: 'destructive' },
};

export const Warning: Story = {
  args: { children: 'Warning', variant: 'warning' },
};

export const Success: Story = {
  args: { children: 'Success', variant: 'success' },
};

export const Info: Story = {
  args: { children: 'Info', variant: 'info' },
};

// Content types with different badge variants
export const ContentTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="default">Text Only</Badge>
      <Badge variant="warning">
        <span className="mr-1">🔥</span>
        With Emoji
      </Badge>
      <Badge variant="success">
        <span className="w-2 h-2 bg-success-foreground rounded-full mr-1"></span>
        With Dot
      </Badge>
      <Badge variant="info">99+</Badge>
    </div>
  ),
};

// Interactive badges
export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge
        variant="default"
        className="cursor-pointer hover:scale-105 transition-transform"
        onClick={() => alert('Badge clicked!')}
      >
        Clickable
      </Badge>
      <Badge
        variant="info"
        className="cursor-pointer transition-colors"
        onClick={() => alert('Info clicked!')}
      >
        Hover Effect
      </Badge>
    </div>
  ),
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="info" className="text-xs px-2 py-0.5">
        Small
      </Badge>
      <Badge variant="success" className="text-sm px-3 py-1">
        Medium
      </Badge>
      <Badge variant="warning" className="text-base px-4 py-1.5">
        Large
      </Badge>
    </div>
  ),
};

export const BadgesInCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {/* User Profile Cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">User Profile Cards</h4>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">John Doe</CardTitle>
                  <CardDescription>Senior Developer</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="success" className="text-xs">
                  <span className="w-2 h-2 bg-success-foreground rounded-full mr-1"></span>
                  Online
                </Badge>
                <Badge variant="info" className="text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">React</Badge>
              <Badge variant="default">TypeScript</Badge>
              <Badge variant="default">Node.js</Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-3">
            <div className="flex gap-2 w-full">
              <Button size="sm" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Sarah Wilson</CardTitle>
                  <CardDescription>UI/UX Designer</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="warning" className="text-xs">
                  <span className="w-2 h-2 bg-warning-foreground rounded-full mr-1"></span>
                  Away
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Figma</Badge>
              <Badge variant="default">Adobe XD</Badge>
              <Badge variant="default">Sketch</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Product Cards</h4>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Premium Plan</CardTitle>
                <CardDescription>Perfect for growing teams</CardDescription>
              </div>
              <Badge variant="success">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold">
                $29<span className="text-sm font-normal">/month</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
                <Badge variant="success" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Best Value
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Choose Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Wireless Headphones</CardTitle>
                <CardDescription>Premium audio experience</CardDescription>
              </div>
              <Badge variant="destructive">Sale</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$199</span>
                <span className="text-lg text-muted-foreground line-through">$299</span>
                <Badge variant="warning" className="text-xs">
                  33% OFF
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="text-xs">
                  Wireless
                </Badge>
                <Badge variant="default" className="text-xs">
                  Noise Cancelling
                </Badge>
                <Badge variant="info" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  4.8 Rating
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};


