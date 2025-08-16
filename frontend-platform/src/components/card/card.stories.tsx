import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion/accordion';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card with all components
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content. It provides context about what the card contains.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card where you can place any content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple card without footer
export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>
          A card without a footer section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card only has header and content sections.</p>
      </CardContent>
    </Card>
  ),
};

// Card with only content
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Content Only Card</h3>
        <p>This card only uses the content section without header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// Product card example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Premium Plan</CardTitle>
          <Badge variant="secondary">Popular</Badge>
        </div>
        <CardDescription>
          Perfect for growing businesses and teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal">/month</span></div>
        <ul className="space-y-2 text-sm">
          <li>✓ Up to 10 team members</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Custom integrations</li>
        </ul>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

// Profile card example
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about creating beautiful and functional user interfaces. 
          5+ years of experience in React and TypeScript.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

export const TeamMemberCard: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader className="text-center">
        <Avatar className="h-16 w-16 mx-auto mb-2">
          <AvatarImage src="https://github.com/vercel.png" alt="Sarah Wilson" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <CardTitle>Sarah Wilson</CardTitle>
        <CardDescription>Product Manager</CardDescription>
        <div className="flex justify-center gap-2 mt-2">
          <Badge variant="secondary">Team Lead</Badge>
          <Badge variant="info">Remote</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department:</span>
            <span>Product</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Experience:</span>
            <span>8 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>San Francisco, CA</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" className="flex-1">Message</Button>
        <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

// Notification card
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">New Message</CardTitle>
          <Badge variant="destructive" className="text-xs">New</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-2">
          You have received a new message from Sarah Wilson.
        </CardDescription>
        <p className="text-sm bg-muted p-3 rounded-md">
          "Hey! I wanted to follow up on our discussion about the project timeline..."
        </p>
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button size="sm" className="flex-1">Reply</Button>
          <Button size="sm" variant="outline">Mark as Read</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Stats card
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardHeader className="pb-2">
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-3xl">$45,231.89</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          <span className="text-success">+20.1%</span> from last month
        </div>
      </CardContent>
    </Card>
  ),
};

// Interactive card with hover effects
export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>
          This card has hover effects and is clickable.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the interactive effects.</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">Click me</Button>
      </CardFooter>
    </Card>
  ),
};

// Multiple cards layout
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the first card.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the second card.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the third card.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Add this new story to the existing card.stories.tsx file

export const SafariCard: Story = {
  render: () => (
    <Card className="w-[400px] overflow-hidden">
      {/* Header with image placeholder and rating */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
          <span>Safari</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm font-medium">
          <span className="text-yellow-500">★</span>
          <span>4.8 (247)</span>
        </div>
        {/* Image placeholder */}
        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Title and Location */}
        <CardTitle className="text-xl font-bold mb-2">Maasai Mara Classic</CardTitle>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Maasai Mara National Reserve, Kenya</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          Experience the world-famous Maasai Mara with incredible wildlife and rich Maasai...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info" className="text-xs">Big 5</Badge>
          <Badge variant="info" className="text-xs">Great Migration</Badge>
          <Badge variant="info" className="text-xs">Cultural Experience</Badge>
        </div>

        {/* Duration and Accommodation */}
        <div className="flex items-center gap-6 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>4-7 days</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Lodge</span>
          </div>
        </div>

        {/* What's Included/Excluded using Accordion */}
        <div className="mb-4">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="included" className="border border-green-200 rounded-lg mb-2 bg-green-50">
              <AccordionTrigger className="px-3 py-2 text-green-700 font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  What's Included
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2">
                <ul className="text-sm space-y-1 text-green-700">
                  <li>• All park entrance fees</li>
                  <li>• Professional safari guide</li>
                  <li>• Game drives in 4x4 vehicle</li>
                  <li>• Lodge accommodation</li>
                  <li>• All meals during safari</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="excluded" className="border border-red-200 rounded-lg bg-red-50">
              <AccordionTrigger className="px-3 py-2 text-red-700 font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  What's Excluded
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2">
                <ul className="text-sm space-y-1 text-red-700">
                  <li>• International flights</li>
                  <li>• Travel insurance</li>
                  <li>• Personal expenses</li>
                  <li>• Alcoholic beverages</li>
                  <li>• Tips and gratuities</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Pricing and CTA */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">$350-450/day</div>
            <div className="text-sm text-gray-600">per person</div>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Operator Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};