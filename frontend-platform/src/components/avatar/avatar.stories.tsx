import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarImage, AvatarFallback, type AvatarProps } from './avatar';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An avatar component for displaying user profile pictures with fallback support. Built with native HTML elements and styled with your Tailwind CSS v4 design system.',
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
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the avatar.',
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
type Story = StoryObj<AvatarProps>;

// Updated to use args properly
export const Default: Story = {
  args: {
    className: '',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  args: {
    className: '',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://broken-link.jpg" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xs">CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-lg">CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const FallbackOnly: Story = {
  args: {
    className: '',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

// Interactive story specifically for testing className control
export const Interactive: Story = {
  args: {
    className: 'h-16 w-16 border-2 border-primary',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar className="border-2 border-primary">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12 border-2 border-destructive">
        <AvatarImage src="https://broken-link.jpg" alt="@user" />
        <AvatarFallback className="bg-destructive text-destructive-foreground">ER</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14 border-2 border-success">
        <AvatarFallback className="bg-success text-success-foreground font-semibold">
          OK
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const UserProfiles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p style={{ fontWeight: '600', margin: 0 }}>John Doe</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>john@example.com</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar>
          <AvatarImage src="https://broken-link.jpg" alt="@jane" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <p style={{ fontWeight: '600', margin: 0 }}>Jane Smith</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>jane@example.com</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
        </Avatar>
        <div>
          <p style={{ fontWeight: '600', margin: 0 }}>Admin User</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>admin@example.com</p>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'end', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xs">XS</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>XS (24px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>SM (32px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>MD (40px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>LG (48px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-lg">XL</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>XL (64px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xl">2XL</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: '12px', color: '#64748b' }}>2XL (80px)</span>
      </div>
    </div>
  ),
};
