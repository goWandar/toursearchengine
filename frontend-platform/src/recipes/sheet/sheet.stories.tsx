import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from './sheet';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Textarea } from '../textarea/textarea';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sheet component built on Radix UI Dialog that slides in from the edge of the screen.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default right side sheet
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Left side sheet
export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate through different sections of the application.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start">
              Projects
            </Button>
            <Button variant="ghost" className="justify-start">
              Team
            </Button>
            <Button variant="ghost" className="justify-start">
              Settings
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// Top side sheet
export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Recent notifications and updates.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">New message received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Project deployed successfully</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">System maintenance scheduled</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// Bottom side sheet
export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Perform quick actions without leaving the current page.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Create New</Button>
            <Button variant="outline">Import Data</Button>
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// Contact form example
export const ContactForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Contact Us</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Send us a message and we&apos;ll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-subject">Subject</Label>
            <Input id="contact-subject" placeholder="what&apos;s this about?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell us more about your inquiry..."
              rows={4}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Send Message</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Shopping cart example
export const ShoppingCart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Cart (3)</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-4">
            {/* Cart items */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Wireless Headphones</h4>
                <p className="text-sm text-muted-foreground">Quantity: 1</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.99</p>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">USB-C Cable</h4>
                <p className="text-sm text-muted-foreground">Quantity: 2</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$29.98</p>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">$129.97</span>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Custom styling example
export const CustomStyling: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Custom Sheet</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl text-blue-600">Custom Styled Sheet</SheetTitle>
          <SheetDescription className="text-base">
            This sheet demonstrates custom styling capabilities.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900">Information</h4>
              <p className="text-sm text-blue-700 mt-1">
                This is a custom styled information box within the sheet.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">42</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-orange-700">Pending</div>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

