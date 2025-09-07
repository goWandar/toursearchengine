import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './separator';
import { Label } from '../label/label';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A separator component built on Radix UI that visually or semantically separates content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative or semantic',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal separator
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

// Horizontal separator
export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Section 1</h4>
        <p className="text-sm text-muted-foreground">
          This is the first section of content.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Section 2</h4>
        <p className="text-sm text-muted-foreground">
          This is the second section of content.
        </p>
      </div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div className="flex flex-col items-center">
        <div className="font-medium">Home</div>
        <div className="text-muted-foreground">Main page</div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center">
        <div className="font-medium">About</div>
        <div className="text-muted-foreground">Learn more</div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center">
        <div className="font-medium">Contact</div>
        <div className="text-muted-foreground">Get in touch</div>
      </div>
    </div>
  ),
};

// Navigation example
export const Navigation: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="font-medium">Dashboard</div>
        <Separator orientation="vertical" />
        <div>Projects</div>
        <Separator orientation="vertical" />
        <div>Team</div>
        <Separator orientation="vertical" />
        <div>Settings</div>
      </div>
    </div>
  ),
};

// Card sections
export const CardSections: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences.
        </p>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Email notifications</Label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label>Marketing emails</Label>
          <input type="checkbox" />
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Two-factor authentication</Label>
          <button className="text-sm text-blue-600 hover:underline">
            Enable
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Label>API access</Label>
          <button className="text-sm text-blue-600 hover:underline">
            Manage
          </button>
        </div>
      </div>
    </div>
  ),
};

// Different styles
export const CustomStyling: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <Separator />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Thick</h4>
        <Separator className="h-[2px]" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Colored</h4>
        <Separator className="bg-blue-500" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Dashed</h4>
        <Separator className="border-t border-dashed border-border bg-transparent" />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Gradient</h4>
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  ),
};

// Form sections
export const FormSections: Story = {
  render: () => (
    <div className="w-96 space-y-6 p-6 border rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">User Profile</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input 
              id="name" 
              className="w-full px-3 py-2 border rounded-md" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <input 
              id="email" 
              type="email" 
              className="w-full px-3 py-2 border rounded-md" 
              placeholder="Enter your email" 
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-4">Preferences</h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="updates" />
            <Label htmlFor="updates">Receive product updates</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  ),
};

// Sidebar layout
export const SidebarLayout: Story = {
  render: () => (
    <div className="flex h-64 w-96 border rounded-lg overflow-hidden">
      <div className="w-48 bg-gray-50 p-4">
        <h4 className="font-medium mb-3">Navigation</h4>
        <div className="space-y-2 text-sm">
          <div className="font-medium text-blue-600">Dashboard</div>
          <div className="text-gray-600">Analytics</div>
          <div className="text-gray-600">Reports</div>
          <div className="text-gray-600">Settings</div>
        </div>
      </div>
      
      <Separator orientation="vertical" />
      
      <div className="flex-1 p-4">
        <h4 className="font-medium mb-3">Main Content</h4>
        <p className="text-sm text-gray-600">
          This is the main content area separated from the sidebar.
        </p>
      </div>
    </div>
  ),
};

