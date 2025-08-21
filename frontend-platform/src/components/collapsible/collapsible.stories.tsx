import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
import { Button } from '../button/button';
import { Card } from '../card/card';
import { Badge } from '../badge/badge';
import * as React from 'react';
import { ChevronDown, ChevronRight, Settings, User, Bell } from 'lucide-react';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The open state of the collapsible',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
    onOpenChange: {
      action: 'open changed',
      description: 'Callback fired when the open state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Toggle Content
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 p-4 border rounded-md bg-gray-50">
        <p className="text-sm text-gray-600">
          This is the collapsible content. It can contain any elements you want to show or hide.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithCard: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible>
        <Card>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Privacy</span>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Account</span>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  ),
};

export const ControlledExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Externally
          </Button>
          <Badge variant={isOpen ? 'success' : 'secondary'}>
            {isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Controlled Collapsible
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded-md">
            <p className="text-sm">
              This collapsible is controlled by external state. 
              Current state: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const MultipleCollapsibles: Story = {
  render: () => {
    const [openItems, setOpenItems] = React.useState<string[]>([]);
    
    const toggleItem = (item: string) => {
      setOpenItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    };
    
    const sections = [
      { id: 'profile', title: 'Profile Settings', icon: User },
      { id: 'notifications', title: 'Notifications', icon: Bell },
      { id: 'advanced', title: 'Advanced Options', icon: Settings },
    ];
    
    return (
      <div className="w-96 space-y-2">
        {sections.map(({ id, title, icon: Icon }) => (
          <Collapsible 
            key={id}
            open={openItems.includes(id)}
            onOpenChange={() => toggleItem(id)}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {title}
                </div>
                {openItems.includes(id) ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 p-3 border rounded-md bg-gray-50">
              <p className="text-sm text-gray-600">
                Content for {title.toLowerCase()}. This section contains 
                various options and settings related to {title.toLowerCase()}.
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const NestedCollapsibles: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Main Category
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-md space-y-2">
          <p className="text-sm mb-3">This is the main category content.</p>
          
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Subcategory 1
                <ChevronDown className="h-3 w-3" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 p-2 bg-gray-100 rounded">
              <p className="text-xs text-gray-600">
                Nested content for subcategory 1.
              </p>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Subcategory 2
                <ChevronDown className="h-3 w-3" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 p-2 bg-gray-100 rounded">
              <p className="text-xs text-gray-600">
                Nested content for subcategory 2.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Collapsible disabled>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between" disabled>
            Disabled Collapsible
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-md">
          <p className="text-sm text-gray-600">
            This content won't be accessible because the collapsible is disabled.
          </p>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Enabled Collapsible
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-md">
          <p className="text-sm text-gray-600">
            This collapsible works normally and can be toggled.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const AnimatedExample: Story = {
  render: () => (
    <div className="w-80">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Animated Collapsible
            <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 overflow-hidden transition-all duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
          <div className="p-4 border rounded-md">
            <p className="text-sm text-gray-600">
              This collapsible has smooth animations when opening and closing.
              The chevron icon also rotates to indicate the state.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};