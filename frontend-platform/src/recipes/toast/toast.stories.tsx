import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

// Import existing components for integration
import { Button } from '../button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card/card';
import { Badge } from '../badge/badge';
import { Avatar } from '../avatar/avatar';
import { Separator } from '../separator/separator';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/select';
import { Calendar, MapPin, Users, Clock, Star, AlertTriangle, CheckCircle } from 'lucide-react';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast component for displaying temporary notifications in safari tour booking scenarios. Supports success, error, and informational messages with actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ToastDemo = ({
  title,
  description,
  variant = 'default',
  action,
}: {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <Toast open={open} onOpenChange={setOpen} variant={variant}>
          <div className="grid gap-1">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </div>
          {action}
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
};

export const Default: Story = {
  render: () => (
    <ToastDemo
      title="Safari Booking Confirmed"
      description="Your 5-day Serengeti safari has been successfully booked."
    />
  ),
};

export const SafariBookingSuccess: Story = {
  render: () => (
    <div className="space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Safari Booking System
          </CardTitle>
          <CardDescription>Complete your Masai Mara safari reservation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="6">6 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input value="7 days" readOnly />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="big-five" />
              <Label htmlFor="big-five">Big Five guarantee</Label>
            </div>
            <Badge variant="secondary">Premium</Badge>
          </div>
          <ToastDemo
            title="Booking Confirmed!"
            description="Your Masai Mara safari is confirmed. Check your email for details."
            action={<ToastAction altText="View booking">View Details</ToastAction>}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const WildlifeSightingAlert: Story = {
  render: () => (
    <div className="space-y-6">
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Wildlife Tracking
          </CardTitle>
          <CardDescription>Real-time sightings in Serengeti National Park</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10" />
            <div>
              <Label className="font-medium">Safari Guide John</Label>
              <p className="text-sm text-muted-foreground">Currently tracking near Acacia trees</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Big Five Spotted
            </Badge>
            <span className="text-sm text-muted-foreground">2 min ago</span>
          </div>
          <ToastDemo
            title="Leopard Sighting!"
            description="A leopard has been spotted 500m from your location. Approach quietly."
            action={<ToastAction altText="Get directions">Get Directions</ToastAction>}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const TourOperatorNotification: Story = {
  render: () => (
    <div className="space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tour Operator Dashboard
          </CardTitle>
          <CardDescription>Manage your safari tour operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Active Tours</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold">48</div>
              <div className="text-sm text-muted-foreground">Guests Today</div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Next departure: 6:00 AM</span>
            </div>
            <Badge variant="outline">On Schedule</Badge>
          </div>
          <ToastDemo
            title="Weather Alert"
            description="Heavy rains expected this afternoon. Consider rescheduling game drives."
            variant="destructive"
            action={<ToastAction altText="Reschedule tours">Reschedule</ToastAction>}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const SafariPreferencesUpdate: Story = {
  render: () => (
    <div className="space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Safari Preferences
          </CardTitle>
          <CardDescription>Customize your wildlife viewing experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Photography Focus</Label>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Bird Watching</Label>
              <Checkbox />
            </div>
            <div className="flex items-center justify-between">
              <Label>Night Game Drives</Label>
              <Checkbox defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Accommodation Preference</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select accommodation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury">Luxury Safari Lodge</SelectItem>
                <SelectItem value="tented">Tented Camp</SelectItem>
                <SelectItem value="mobile">Mobile Camp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ToastDemo
            title="Preferences Saved"
            description="Your safari preferences have been updated successfully."
            action={<ToastAction altText="View recommendations">View Tours</ToastAction>}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const BookingErrorAlert: Story = {
  render: () => (
    <div className="space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Booking Error
          </CardTitle>
          <CardDescription>There was an issue processing your safari booking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Payment Failed</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your payment could not be processed. Please try again.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Booking Reference</Label>
            <Input value="SAF-2024-001" readOnly />
          </div>
          <ToastDemo
            title="Payment Failed"
            description="Unable to process payment for Kruger Safari booking. Please try again."
            variant="destructive"
            action={<ToastAction altText="Retry payment">Retry Payment</ToastAction>}
          />
        </CardContent>
      </Card>
    </div>
  ),
};


