import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './label';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { FormEvent, useState } from 'react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A label component built on Radix UI that provides accessible form labels with proper association to form controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The id of the form control this label is associated with',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Label text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Label
export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

// Label with Input
export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

// Required Field
export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="name">
        Full Name <span className="text-red-500">*</span>
      </Label>
      <Input id="name" type="text" placeholder="Enter your full name" required />
    </div>
  ),
};

// Label with Checkbox
export const WithCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="small" className="text-xs">
          Small Label
        </Label>
        <Input id="small" placeholder="Small input" className="h-8" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="default">Default Label</Label>
        <Input id="default" placeholder="Default input" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="large" className="text-base font-semibold">
          Large Label
        </Label>
        <Input id="large" placeholder="Large input" className="h-12" />
      </div>
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      newsletter: false,
    });

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={formData.newsletter}
            onCheckedChange={(checked) => setFormData({ ...formData, newsletter: !!checked })}
          />
          <Label htmlFor="newsletter">Subscribe to our newsletter</Label>
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

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="disabled-input"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled Input
        </Label>
        <Input id="disabled-input" placeholder="This input is disabled" disabled />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checkbox" disabled />
        <Label
          htmlFor="disabled-checkbox"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled Checkbox
        </Label>
      </div>
    </div>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="success" className="text-green-600 font-semibold">
          ✓ Success Label
        </Label>
        <Input
          id="success"
          placeholder="Valid input"
          className="border-green-500 focus-visible:ring-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error" className="text-red-600 font-semibold">
          ✗ Error Label
        </Label>
        <Input
          id="error"
          placeholder="Invalid input"
          className="border-red-500 focus-visible:ring-red-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="warning" className="text-yellow-600 font-semibold">
          ⚠ Warning Label
        </Label>
        <Input
          id="warning"
          placeholder="Warning input"
          className="border-yellow-500 focus-visible:ring-yellow-500"
        />
      </div>
    </div>
  ),
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Accessibility Features:</h3>
        <ul className="text-sm space-y-1 mb-4">
          <li>• Labels are properly associated with form controls</li>
          <li>• Screen readers will announce the label when focusing inputs</li>
          <li>• Clicking labels focuses the associated form control</li>
          <li>• Disabled states are properly communicated</li>
        </ul>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="accessible-input">Click this label to focus the input</Label>
            <Input id="accessible-input" placeholder="Focus me by clicking the label above" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="accessible-checkbox" />
            <Label htmlFor="accessible-checkbox">Click this text to toggle the checkbox</Label>
          </div>
        </div>
      </div>
    </div>
  ),
};
