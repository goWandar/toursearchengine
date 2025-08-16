import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button, type ButtonProps } from './button';
import { Badge } from '../badge/badge';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card/card';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';
import {
  Mail,
  Download,
  Plus,
  ArrowRight,
  Search,
  Settings,
  X,
  Menu,
  Heart,
  Share,
  Edit,
  Trash2,
  Bell,
  MessageSquare,
  ShoppingCart,
  User,
  Users,
  Calendar,
} from 'lucide-react';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes. Built with semantic color tokens and styled with your Tailwind CSS v4 design system. Icon-only buttons (size="icon") require aria-label for accessibility.',
      },
      canvas: {
        sourceState: 'hidden',
      },
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button.',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button. Use "icon" for icon-only buttons.',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Change the default rendered element for the one passed as a child.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled.',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state.',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button.',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          padding: '16px',
          minHeight: '120px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Interactive story for controls
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
    asChild: false,
    loading: false,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// Icon-only buttons showcase
export const IconOnlyButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Navigation & Actions</h4>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Primary Actions</h4>
        <div className="flex gap-2">
          <Button size="icon" aria-label="Add new item">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Edit item">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" aria-label="Delete item">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Social Actions</h4>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" aria-label="Like this post">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Share this content">
            <Share className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" aria-label="Download file">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Buttons with icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="secondary">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add new item">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading disabled>
        Please wait
      </Button>
      <Button variant="outline" loading disabled>
        Loading...
      </Button>
      <Button size="icon" loading disabled aria-label="Loading">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default Disabled</Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="ghost" disabled>
        Ghost Disabled
      </Button>
      <Button variant="link" disabled>
        Link Disabled
      </Button>
      <Button size="icon" disabled aria-label="Disabled action">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// AsChild example (renders as a link)
export const AsChildExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          External Link
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#">Internal Link</a>
      </Button>
      <Button size="icon" variant="ghost" asChild>
        <a href="#" aria-label="External link">
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  ),
};

// Enhanced Button Stories with Component Integrations

// 1. Buttons with Badge components for notification counts
export const WithNotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Notification Buttons</h4>
        <div className="flex gap-4">
          <div className="relative">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </div>

          <div className="relative">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Badge
              variant="info"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              12
            </Badge>
          </div>

          <div className="relative">
            <Button size="icon" variant="ghost" aria-label="Shopping cart">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Badge
              variant="warning"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              5
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Status Indicators</h4>
        <div className="flex gap-4">
          <Button variant="secondary">
            <Users className="mr-2 h-4 w-4" />
            Team
            <Badge variant="success" className="ml-2">
              Online
            </Badge>
          </Button>

          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Events
            <Badge variant="warning" className="ml-2">
              2 Today
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 2. Button groups within Card containers
export const ButtonGroupsInCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Project Actions</CardTitle>
          <CardDescription>Manage your project with these quick actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="secondary">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>File Operations</CardTitle>
          <CardDescription>Upload, download, and manage your files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <Button variant="secondary" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// 3. Buttons with Avatar components for user actions
export const ButtonsWithAvatars: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">User Action Buttons</h4>
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="justify-start">
            <Avatar className="h-6 w-6 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            Message John Doe
            <MessageSquare className="ml-auto h-4 w-4" />
          </Button>

          <Button variant="outline" className="justify-start">
            <Avatar className="h-6 w-6 mr-3">
              <AvatarImage src="https://github.com/vercel.png" alt="Sarah Wilson" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            Call Sarah Wilson
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="success" className="text-xs">
                Online
              </Badge>
            </div>
          </Button>

          <Button variant="outline" className="justify-start">
            <Avatar className="h-6 w-6 mr-3">
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            Invite Mike Johnson
            <Plus className="ml-auto h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 4. User profile cards with action buttons
export const UserProfileCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-[320px]">
        <CardHeader className="text-center">
          <Avatar className="h-16 w-16 mx-auto mb-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Alex Thompson" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <CardTitle>Alex Thompson</CardTitle>
          <CardDescription>Senior Developer</CardDescription>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="success">Available</Badge>
            <Badge variant="info">Remote</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>Engineering</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span>5 years</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button size="sm" className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-[320px]">
        <CardHeader className="text-center">
          <Avatar className="h-16 w-16 mx-auto mb-2">
            <AvatarImage src="https://github.com/vercel.png" alt="Emma Davis" />
            <AvatarFallback>ED</AvatarFallback>
          </Avatar>
          <CardTitle>Emma Davis</CardTitle>
          <CardDescription>Product Manager</CardDescription>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="warning">Busy</Badge>
            <Badge variant="secondary">Team Lead</Badge>
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
              <span>7 years</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button size="sm" variant="secondary" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// 5. Interactive notification center
export const NotificationCenter: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Badge variant="info">4 New</Badge>
        </div>
        <CardDescription>Stay updated with your latest activities.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <p>John mentioned you in a comment</p>
            <p className="text-muted-foreground text-xs">2 minutes ago</p>
          </div>
          <Button size="sm" variant="ghost">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <p>Sarah shared a file with you</p>
            <p className="text-muted-foreground text-xs">1 hour ago</p>
          </div>
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Mark All Read
        </Button>
        <Button size="sm" className="flex-1">
          View All
        </Button>
      </CardFooter>
    </Card>
  ),
};
