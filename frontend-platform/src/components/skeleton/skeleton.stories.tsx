import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A placeholder component that shows a loading state with a pulsing animation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-[250px]',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const Rectangle: Story = {
  args: {
    className: 'h-20 w-40',
  },
};

export const Text: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

// Card Skeleton Example
export const CardSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a card skeleton with avatar and text placeholders.',
      },
    },
  },
};

// Article Skeleton Example
export const ArticleSkeleton: Story = {
  render: () => (
    <div className="space-y-4 p-4 border rounded-lg max-w-md">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of an article skeleton with title, image, content, and author placeholders.',
      },
    },
  },
};

// Table Skeleton Example
export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-3 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a table skeleton with header and row placeholders.',
      },
    },
  },
};

// List Skeleton Example
export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-3 p-4 border rounded-lg max-w-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a list skeleton with avatar and text placeholders for each item.',
      },
    },
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Skeleton className="h-2 w-32" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium</p>
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Skeleton className="h-6 w-64" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Extra Large</p>
        <Skeleton className="h-8 w-80" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different skeleton sizes for various use cases.',
      },
    },
  },
};

// Profile Skeleton Example
export const ProfileSkeleton: Story = {
  render: () => (
    <div className="space-y-6 p-6 border rounded-lg max-w-sm">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2 text-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a profile skeleton with avatar, name, bio, and action buttons.',
      },
    },
  },
};