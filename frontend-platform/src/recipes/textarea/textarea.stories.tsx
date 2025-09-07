import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './textarea';
import { Label } from '../label/label';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A textarea component for multi-line text input with proper styling and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default textarea
export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="small">Small (3 rows)</Label>
        <Textarea id="small" placeholder="Small textarea" rows={3} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medium">Medium (5 rows)</Label>
        <Textarea id="medium" placeholder="Medium textarea" rows={5} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="large">Large (8 rows)</Label>
        <Textarea id="large" placeholder="Large textarea" rows={8} />
      </div>
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="disabled-empty">Disabled (Empty)</Label>
        <Textarea 
          id="disabled-empty" 
          placeholder="This textarea is disabled" 
          disabled 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="disabled-filled">Disabled (With Content)</Label>
        <Textarea 
          id="disabled-filled" 
          defaultValue="This textarea is disabled and has content that cannot be edited."
          disabled 
        />
      </div>
    </div>
  ),
};

// With Character Count
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    
    return (
      <div className="space-y-2 w-80">
        <Label htmlFor="char-count">Description (max {maxLength} characters)</Label>
        <Textarea 
          id="char-count"
          placeholder="Enter your description..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
        />
        <div className="text-sm text-muted-foreground text-right">
          {value.length}/{maxLength}
        </div>
      </div>
    );
  },
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const [comments, setComments] = useState('');
    
    return (
      <div className="space-y-6 w-96 p-6 border rounded-lg">
        <h3 className="text-lg font-semibold">Feedback Form</h3>
        
        <div className="space-y-2">
          <Label htmlFor="feedback">Your Feedback *</Label>
          <Textarea 
            id="feedback"
            placeholder="Please share your thoughts and feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">Additional Comments</Label>
          <Textarea 
            id="comments"
            placeholder="Any additional comments or suggestions?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
          />
        </div>
        
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          disabled={!feedback.trim()}
        >
          Submit Feedback
        </button>
      </div>
    );
  },
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="success" className="text-green-600 font-semibold">
          ✓ Success State
        </Label>
        <Textarea 
          id="success"
          placeholder="Valid input"
          className="border-green-500 focus-visible:ring-green-500"
          defaultValue="This looks good!"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="error" className="text-red-600 font-semibold">
          ✗ Error State
        </Label>
        <Textarea 
          id="error"
          placeholder="Invalid input"
          className="border-red-500 focus-visible:ring-red-500"
          defaultValue="This needs attention."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="warning" className="text-yellow-600 font-semibold">
          ⚠ Warning State
        </Label>
        <Textarea 
          id="warning"
          placeholder="Warning input"
          className="border-yellow-500 focus-visible:ring-yellow-500"
          defaultValue="Please review this content."
        />
      </div>
    </div>
  ),
};

// Resizable
export const Resizable: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="resizable-both">Resizable (Both)</Label>
        <Textarea 
          id="resizable-both"
          placeholder="You can resize this textarea in both directions"
          className="resize"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resizable-vertical">Resizable (Vertical Only)</Label>
        <Textarea 
          id="resizable-vertical"
          placeholder="You can only resize this textarea vertically"
          className="resize-y"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="no-resize">No Resize</Label>
        <Textarea 
          id="no-resize"
          placeholder="This textarea cannot be resized"
          className="resize-none"
          rows={4}
        />
      </div>
    </div>
  ),
};

