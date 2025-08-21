import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Settings,
  User,
  FileText,
  BarChart3,
  Users,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { forwardRef } from 'react';

type NavigationMenuProps = React.ComponentProps<typeof NavigationMenu>;

const meta: Meta<NavigationMenuProps> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A navigation menu component built with Radix UI primitives. Provides accessible navigation with dropdown menus and keyboard support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the navigation menu.',
    },
    dir: {
      control: { type: 'radio' },
      options: ['ltr', 'rtl'],
      description: 'The reading direction of the navigation menu.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for consistent link styling
const ListItem = forwardRef<React.ComponentRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }: React.ComponentPropsWithoutRef<'a'>, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem title="Alert Dialog" href="/docs/primitives/alert-dialog">
                A modal dialog that interrupts the user with important content.
              </ListItem>
              <ListItem title="Hover Card" href="/docs/primitives/hover-card">
                For sighted users to preview content available behind a link.
              </ListItem>
              <ListItem title="Progress" href="/docs/primitives/progress">
                Displays an indicator showing the completion progress.
              </ListItem>
              <ListItem title="Scroll-area" href="/docs/primitives/scroll-area">
                Visually or semantically separates content.
              </ListItem>
              <ListItem title="Tabs" href="/docs/primitives/tabs">
                A set of layered sections of content.
              </ListItem>
              <ListItem title="Tooltip" href="/docs/primitives/tooltip">
                A popup that displays information related to an element.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SimpleNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <User className="mr-2 h-4 w-4" />
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem title="Profile" href="/profile">
                <User className="mr-2 h-4 w-4 inline" />
                Manage your personal information and preferences.
              </ListItem>
              <ListItem title="Settings" href="/settings">
                <Settings className="mr-2 h-4 w-4 inline" />
                Configure your account settings and privacy options.
              </ListItem>
              <ListItem title="Billing" href="/billing">
                <BarChart3 className="mr-2 h-4 w-4 inline" />
                View your subscription and payment information.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FileText className="mr-2 h-4 w-4" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[300px]">
              <ListItem title="Documentation" href="/docs">
                Complete guides and API references.
              </ListItem>
              <ListItem title="Examples" href="/examples">
                Code examples and implementation guides.
              </ListItem>
              <ListItem title="Blog" href="/blog">
                Latest updates and tutorials.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const CompanyNavigation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem title="Analytics" href="/products/analytics">
                <BarChart3 className="mr-2 h-4 w-4 inline" />
                Advanced analytics and reporting tools.
              </ListItem>
              <ListItem title="CRM" href="/products/crm">
                <Users className="mr-2 h-4 w-4 inline" />
                Customer relationship management platform.
              </ListItem>
              <ListItem title="Email Marketing" href="/products/email">
                <Mail className="mr-2 h-4 w-4 inline" />
                Automated email campaigns and newsletters.
              </ListItem>
              <ListItem title="Calendar" href="/products/calendar">
                <Calendar className="mr-2 h-4 w-4 inline" />
                Schedule meetings and manage events.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[300px]">
              <ListItem title="About Us" href="/about">
                Learn about our mission and values.
              </ListItem>
              <ListItem title="Careers" href="/careers">
                Join our team and grow with us.
              </ListItem>
              <ListItem title="Press" href="/press">
                Latest news and press releases.
              </ListItem>
              <ListItem title="Contact" href="/contact">
                <Phone className="mr-2 h-4 w-4 inline" />
                Get in touch with our team.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/pricing"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="w-64">
      <NavigationMenu orientation="vertical" className="max-w-none">
        <NavigationMenuList className="flex-col space-x-0 space-y-1">
          <NavigationMenuItem className="w-full">
            <NavigationMenuTrigger className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 w-56">
                <ListItem title="Overview" href="/dashboard">
                  General dashboard overview.
                </ListItem>
                <ListItem title="Analytics" href="/dashboard/analytics">
                  Detailed analytics and reports.
                </ListItem>
                <ListItem title="Settings" href="/dashboard/settings">
                  Dashboard configuration.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full">
            <NavigationMenuTrigger className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 w-56">
                <ListItem title="Members" href="/team/members">
                  Manage team members.
                </ListItem>
                <ListItem title="Roles" href="/team/roles">
                  Configure user roles.
                </ListItem>
                <ListItem title="Permissions" href="/team/permissions">
                  Set access permissions.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full">
            <NavigationMenuLink
              href="/settings"
              className="group inline-flex h-10 w-full items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const WithExternalLinks: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem title="Documentation" href="/docs">
                Complete guides and API references.
              </ListItem>
              <ListItem title="GitHub" href="https://github.com" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4 inline" />
                View our open source projects.
              </ListItem>
              <ListItem title="Community" href="https://discord.com" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4 inline" />
                Join our Discord community.
              </ListItem>
              <ListItem title="Support" href="mailto:support@example.com">
                <Mail className="mr-2 h-4 w-4 inline" />
                Get help from our support team.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/blog"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://example.com"
            target="_blank"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            External Site
            <ExternalLink className="ml-2 h-4 w-4" />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const MegaMenu: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[800px] grid-cols-3">
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">For Business</h4>
                <ul className="grid gap-2">
                  <ListItem title="Enterprise" href="/enterprise">
                    Large-scale business solutions.
                  </ListItem>
                  <ListItem title="Small Business" href="/small-business">
                    Tools for growing companies.
                  </ListItem>
                  <ListItem title="Startups" href="/startups">
                    Resources for new ventures.
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">For Developers</h4>
                <ul className="grid gap-2">
                  <ListItem title="API" href="/api">
                    Powerful APIs for integration.
                  </ListItem>
                  <ListItem title="SDKs" href="/sdks">
                    Software development kits.
                  </ListItem>
                  <ListItem title="Webhooks" href="/webhooks">
                    Real-time event notifications.
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Industries</h4>
                <ul className="grid gap-2">
                  <ListItem title="Healthcare" href="/healthcare">
                    <MapPin className="mr-2 h-4 w-4 inline" />
                    Healthcare-specific solutions.
                  </ListItem>
                  <ListItem title="Finance" href="/finance">
                    <BarChart3 className="mr-2 h-4 w-4 inline" />
                    Financial services tools.
                  </ListItem>
                  <ListItem title="Education" href="/education">
                    <FileText className="mr-2 h-4 w-4 inline" />
                    Educational technology.
                  </ListItem>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/pricing"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
