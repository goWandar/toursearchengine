import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A collapsible content component built with Radix UI and styled with your Tailwind CSS v4 design system.',
      },
      canvas: {
        sourceState: 'hidden',
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['single', 'multiple'],
      description: 'Determines whether one or multiple items can be opened at the same time.',
    },
    collapsible: {
      control: { type: 'boolean' },
      description:
        'When type is "single", allows closing content when clicking trigger for an open item.',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          padding: '16px',
          minHeight: '200px',
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
type Story = StoryObj<AccordionProps>;

// This will be the primary story shown in the Docs main preview
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args: AccordionProps) => (
    <div style={{ width: '600px' }}>
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and uses Radix UI primitives for proper
            keyboard navigation and screen reader support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that respect your design system tokens and can be
            customized with additional className props.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses smooth animations for expanding and collapsing content using your custom
            Tailwind CSS v4 keyframes.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args: AccordionProps) => (
    <div style={{ width: '600px' }}>
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>🎨 Design System</AccordionTrigger>
          <AccordionContent>
            Built with your comprehensive design system including semantic color tokens, consistent
            spacing, and proper typography scales.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>⚡ Performance</AccordionTrigger>
          <AccordionContent>
            Optimized with React.forwardRef and efficient re-rendering patterns for smooth user
            interactions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>🔧 Customizable</AccordionTrigger>
          <AccordionContent>
            Every part accepts className props for customization while maintaining design system
            consistency.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>🌙 Dark Mode</AccordionTrigger>
          <AccordionContent>
            Fully supports dark mode through CSS custom properties that automatically adapt based on
            the theme context.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args: AccordionProps) => (
    <div style={{ width: '600px' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#e5e5e5',
          color: '#0a0a0a',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Custom Styled Accordion
        </h3>
        <Accordion {...args}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Primary Color Trigger</AccordionTrigger>
            <AccordionContent>
              This accordion item uses primary colors and is contained within a card component.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Secondary Styling</AccordionTrigger>
            <AccordionContent>
              Demonstrating how the accordion adapts to different color schemes within your design
              system.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

export const ColorShowcase: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: () => (
    <div style={{ width: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              backgroundColor: '#0066cc',
              color: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Primary</h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              bg-primary & text-primary-foreground
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0f172a',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Secondary</h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              bg-secondary & text-secondary-foreground
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f8fafc',
              color: '#64748b',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Muted</h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              bg-muted & text-muted-foreground
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0f172a',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Accent</h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              bg-accent & text-accent-foreground
            </p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="colors">
          <AccordionTrigger>View Design System Colors</AccordionTrigger>
          <AccordionContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#dc2626',
                    borderRadius: '2px',
                  }}
                ></div>
                <span style={{ fontSize: '14px' }}>Destructive</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#e5e5e5',
                    borderRadius: '2px',
                  }}
                ></div>
                <span style={{ fontSize: '14px' }}>Border</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#0066cc',
                    borderRadius: '2px',
                  }}
                ></div>
                <span style={{ fontSize: '14px' }}>Ring</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
