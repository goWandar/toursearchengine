import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { FormEvent, useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible input component built with forwardRef for form integration and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'file',
      ],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Different Input Types
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
    min: 0,
    max: 100,
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};

export const File: Story = {
  args: {
    type: 'file',
    accept: '.jpg,.jpeg,.png,.pdf',
  },
};

// States
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Required field...',
    required: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
  },
};

// Controlled Input Example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p className="text-sm text-muted-foreground">Current value: {value || '(empty)'}</p>
      </div>
    );
  },
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      age: '',
    });

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium mb-1">
            Age
          </label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    );
  },
};

// Validation States
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">Valid Input</label>
        <Input
          placeholder="Valid input"
          className="border-green-500 focus-visible:ring-green-500"
        />
        <p className="text-sm text-green-600 mt-1">✓ This field is valid</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Invalid Input</label>
        <Input placeholder="Invalid input" className="border-red-500 focus-visible:ring-red-500" />
        <p className="text-sm text-red-600 mt-1">✗ This field has an error</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Warning Input</label>
        <Input
          placeholder="Warning input"
          className="border-yellow-500 focus-visible:ring-yellow-500"
        />
        <p className="text-sm text-yellow-600 mt-1">⚠ This field has a warning</p>
      </div>
    </div>
  ),
};

// Sizes Example
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <Input placeholder="Small input" className="h-8 px-2 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Default</label>
        <Input placeholder="Default input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <Input placeholder="Large input" className="h-12 px-4 text-base" />
      </div>
    </div>
  ),
};
