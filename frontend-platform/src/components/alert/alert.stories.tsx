import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert, AlertDescription, AlertTitle, type AlertProps } from './alert';
import { Button } from '../button/button';
// Top imports: alias the Info icon
import {
  AlertCircle,
  CheckCircle,
  Info as InfoIcon,
  AlertTriangle,
  Terminal,
  X,
  Download,
  RefreshCw,
} from 'lucide-react';

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

<InfoIcon className="h-4 w-4" />;

// Update WithDismissButton story
export const WithDismissButton: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args} className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <InfoIcon className="h-4 w-4 mt-0.5" />
          <div>
            <AlertTitle>New Feature Available</AlertTitle>
            <AlertDescription>
              We've added dark mode support to your dashboard. Try it out in your settings.
            </AlertDescription>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  ),
};

// Update SuccessWithAction story
export const SuccessWithAction: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args} className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <CheckCircle className="h-4 w-4 mt-0.5" />
          <div>
            <AlertTitle>File Uploaded Successfully</AlertTitle>
            <AlertDescription className="mb-3">
              Your document has been uploaded and is now being processed. You'll receive a notification
              when it's ready.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                View File
              </Button>
              <Button size="sm" variant="ghost">
                Upload Another
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  ),
};

// Update InteractiveAlerts story - specifically the warning alert that has a close button
export const InteractiveAlerts: Story = {
  render: () => (
    <div style={{ width: '700px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info">
        <div className="flex items-start gap-3">
          <InfoIcon className="h-4 w-4 mt-0.5" />
          <div className="flex-1">
            <AlertTitle>Cookie Consent</AlertTitle>
            <AlertDescription className="mb-3">
              We use cookies to enhance your experience. By continuing to visit this site you agree to
              our use of cookies.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm" variant="default">
                Accept All
              </Button>
              <Button size="sm" variant="outline">
                Customize
              </Button>
              <Button size="sm" variant="ghost">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </Alert>

      <Alert variant="warning" className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <AlertTriangle className="h-4 w-4 mt-0.5" />
          <div>
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription className="mb-3">
              You're using 95% of your storage space. Upgrade your plan or delete some files to
              continue.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm" variant="default">
                Upgrade Plan
              </Button>
              <Button size="sm" variant="outline">
                Manage Files
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>

      <Alert variant="destructive">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <div className="flex-1">
            <AlertTitle>Payment Failed</AlertTitle>
            <AlertDescription className="mb-3">
              Your payment could not be processed. Please update your payment method to continue your
              subscription.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Update Payment
              </Button>
              <Button size="sm" variant="ghost">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  ),
};

export const WithActionButtons: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <AlertTriangle className="h-4 w-4" />
        <div className="flex-1">
          <AlertTitle>Update Required</AlertTitle>
          <AlertDescription className="mb-3">
            A new version is available. Update now to get the latest features and security
            improvements.
          </AlertDescription>
          <div className="flex gap-2">
            <Button size="sm" variant="default">
              <Download className="h-4 w-4" />
              Update Now
            </Button>
            <Button size="sm" variant="outline">
              Remind Later
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  ),
};

export const ErrorWithRetry: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Alert {...args}>
        <AlertCircle className="h-4 w-4" />
        <div className="flex-1">
          <AlertTitle>Connection Failed</AlertTitle>
          <AlertDescription className="mb-3">
            Unable to connect to the server. Please check your internet connection and try again.
          </AlertDescription>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  ),
};
