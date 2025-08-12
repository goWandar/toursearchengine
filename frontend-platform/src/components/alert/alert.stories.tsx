import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert, AlertDescription, AlertTitle, type AlertProps } from './alert';
// Top imports: alias the Info icon
import { AlertCircle, CheckCircle, Info as InfoIcon, AlertTriangle, Terminal } from 'lucide-react';

const meta: Meta<AlertProps> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays a callout for user attention. Built with semantic color tokens and styled with your Tailwind CSS v4 design system.',
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
      control: { type: 'radio' },
      options: ['default', 'destructive', 'warning', 'success', 'info'],
      description: 'The visual style variant of the alert.',
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
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<AlertProps>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Update the Info story to use the aliased icon (if present)
export const Info = {
  args: {
    variant: 'info',
  },
  render: (args: AlertProps) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This feature is currently in beta. Please report any issues you encounter.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <AlertTitle>Simple Alert</AlertTitle>
        <AlertDescription>
          This alert doesn't have an icon. The layout automatically adjusts.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const OnlyDescription: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>Sometimes you only need a description without a title.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ width: '700px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert with neutral styling.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert with blue styling.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert with green styling.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert with yellow styling.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is a destructive alert with red styling.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Replace any remaining JSX usages of the icon:
// For example, around line ~165 in AllVariants (or similar)
<InfoIcon className="h-4 w-4" />;
