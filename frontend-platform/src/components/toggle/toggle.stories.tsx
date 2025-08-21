import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './toggle';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A two-state button that can be either on or off. Built on top of Radix UI Toggle primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'The visual style variant of the toggle',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    pressed: {
      control: { type: 'boolean' },
      description: 'The pressed state of the toggle',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Toggle',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Toggle',
  },
};

export const WithIcon: Story = {
  args: {
    children: <Bold className="h-4 w-4" />,
    'aria-label': 'Toggle bold',
  },
};

export const Pressed: Story = {
  args: {
    pressed: true,
    children: <Bold className="h-4 w-4" />,
    'aria-label': 'Toggle bold',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Toggle',
  },
};

export const DisabledPressed: Story = {
  args: {
    disabled: true,
    pressed: true,
    children: 'Toggle',
  },
};

// Text Formatting Toolbar Example
export const TextFormattingToolbar: Story = {
  render: () => (
    <div className="flex items-center space-x-1 p-2 border rounded-lg bg-background">
      <Toggle size="sm" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-1" />
      <Toggle size="sm" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using toggles in a text formatting toolbar.',
      },
    },
  },
};

// Outline Variants
export const OutlineVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <div className="flex space-x-2">
          <Toggle size="sm">Small</Toggle>
          <Toggle>Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Outline</p>
        <div className="flex space-x-2">
          <Toggle variant="outline" size="sm">Small</Toggle>
          <Toggle variant="outline">Default</Toggle>
          <Toggle variant="outline" size="lg">Large</Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all size and variant combinations.',
      },
    },
  },
};

// States Demo
export const StatesDemo: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default Variant</p>
        <div className="flex space-x-2">
          <Toggle>Normal</Toggle>
          <Toggle pressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled pressed>Disabled + Pressed</Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Outline Variant</p>
        <div className="flex space-x-2">
          <Toggle variant="outline">Normal</Toggle>
          <Toggle variant="outline" pressed>Pressed</Toggle>
          <Toggle variant="outline" disabled>Disabled</Toggle>
          <Toggle variant="outline" disabled pressed>Disabled + Pressed</Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all possible toggle states.',
      },
    },
  },
};