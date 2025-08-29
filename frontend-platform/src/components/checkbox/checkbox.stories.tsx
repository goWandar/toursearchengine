import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './checkbox';
import { ComponentProps } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: (args: ComponentProps<typeof Checkbox>) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <label
          htmlFor="newsletter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Subscribe to newsletter
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <label
          htmlFor="marketing"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Receive marketing emails
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="updates" defaultChecked />
        <label
          htmlFor="updates"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Get product updates
        </label>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Select your interests</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="tech" />
          <label htmlFor="tech" className="text-sm">
            Technology
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="design" />
          <label htmlFor="design" className="text-sm">
            Design
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="business" />
          <label htmlFor="business" className="text-sm">
            Business
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="science" />
          <label htmlFor="science" className="text-sm">
            Science
          </label>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-sm">
          Unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" checked />
        <label htmlFor="checked" className="text-sm">
          Checked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <label htmlFor="disabled-unchecked" className="text-sm">
          Disabled Unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled checked />
        <label htmlFor="disabled-checked" className="text-sm">
          Disabled Checked
        </label>
      </div>
    </div>
  ),
};
