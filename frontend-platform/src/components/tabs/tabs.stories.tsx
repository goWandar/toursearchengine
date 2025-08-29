import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card/card';
import { Label } from '../label/label';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Badge } from '../badge/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar/avatar';
import { Separator } from '../separator/separator';
import { Alert, AlertDescription } from '../alert/alert';
import { Progress } from '../progress/progress';
import { Checkbox } from '../checkbox/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/select';
import { Textarea } from '../textarea/textarea';
import { Slider } from '../slider/slider';
import { Switch } from '../switch/switch';
import { Calendar, MapPin, Users, Clock, Star, Camera, Binoculars, Tent } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tabs component built with Radix UI that organizes content into multiple panels, perfect for safari tour information and booking flows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="booking">Booking</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-2">
        <h3 className="text-lg font-semibold">Serengeti Safari Overview</h3>
        <p className="text-sm text-muted-foreground">
          Experience the Big Five in Tanzania's most famous national park.
        </p>
      </TabsContent>
      <TabsContent value="itinerary" className="space-y-2">
        <h3 className="text-lg font-semibold">5-Day Itinerary</h3>
        <p className="text-sm text-muted-foreground">
          Day-by-day breakdown of your safari adventure.
        </p>
      </TabsContent>
      <TabsContent value="booking" className="space-y-2">
        <h3 className="text-lg font-semibold">Book Your Safari</h3>
        <p className="text-sm text-muted-foreground">
          Select dates and preferences for your safari experience.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const SafariTourDetails: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Binoculars className="h-5 w-5" />
          Masai Mara Big Five Safari
        </CardTitle>
        <CardDescription>
          7-day luxury safari experience in Kenya's premier wildlife reserve
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
            <TabsTrigger value="accommodation">Lodging</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Duration
                </Label>
                <p className="text-sm">7 days, 6 nights</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Group Size
                </Label>
                <p className="text-sm">Max 8 people</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <p className="text-sm">Masai Mara, Kenya</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Best Season
                </Label>
                <p className="text-sm">July - October</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Safari Highlights</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Big Five Guaranteed</Badge>
                <Badge variant="info">Great Migration</Badge>
                <Badge variant="warning">Hot Air Balloon</Badge>
                <Badge variant="default">Cultural Visit</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wildlife" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label>Expected Wildlife Sightings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Lions</span>
                  <Progress value={95} className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Elephants</span>
                  <Progress value={90} className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Leopards</span>
                  <Progress value={70} className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rhinos</span>
                  <Progress value={45} className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Buffalo</span>
                  <Progress value={85} className="w-24" />
                </div>
              </div>
            </div>
            <Alert>
              <Camera className="h-4 w-4" />
              <AlertDescription>
                Professional photography guide included for optimal wildlife shots.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="accommodation" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Tent className="h-5 w-5" />
                <div>
                  <Label>Luxury Tented Camp</Label>
                  <p className="text-sm text-muted-foreground">Mara Serena Safari Lodge</p>
                </div>
                <Badge variant="success">5★ Luxury</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Checkbox checked disabled />
                    <span>Private bathroom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked disabled />
                    <span>Game viewing deck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked disabled />
                    <span>All meals included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked disabled />
                    <span>WiFi available</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Davis</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Incredible safari experience! Saw all Big Five and the guides were
                    exceptional."
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Sarah Miller</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "The accommodation was luxurious and the wildlife viewing was beyond
                    expectations."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
};

export const SafariBookingFlow: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Book Your Serengeti Adventure</CardTitle>
        <CardDescription>Complete your safari booking in a few simple steps</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="dates" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure Date</Label>
                <Input id="departure" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Safari Duration</Label>
                <div className="space-y-2">
                  <Slider defaultValue={[5]} max={14} min={3} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>3 days</span>
                    <span>5 days</span>
                    <span>14 days</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Safari Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="big-five" />
                    <Label htmlFor="big-five">Big Five Focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="photography" />
                    <Label htmlFor="photography">Photography Safari</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="cultural" />
                    <Label htmlFor="cultural">Cultural Experiences</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="balloon" />
                    <Label htmlFor="balloon">Hot Air Balloon Ride</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Summary</Label>
                <div className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>5-day Serengeti Safari</span>
                    <span>$2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>2 Guests</span>
                    <span>$5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hot Air Balloon Add-on</span>
                    <span>$400</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>$5,400</span>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  A 30% deposit is required to secure your booking. Full payment due 30 days before
                  departure.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Complete Booking</Button>
      </CardFooter>
    </Card>
  ),
};

export const TourOperatorDashboard: Story = {
  render: () => (
    <div className="w-[700px] space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-operator.jpg" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Masai Safari Experts</CardTitle>
              <CardDescription>Premium safari operator since 1995</CardDescription>
            </div>
            <Badge variant="success" className="ml-auto">
              Verified Operator
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="tours" className="space-y-4 mt-4">
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Classic Masai Mara Safari</h4>
                      <p className="text-sm text-muted-foreground">5 days • Big Five focus</p>
                    </div>
                    <Badge variant="info">Popular</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">$2,200/person</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Luxury Serengeti Experience</h4>
                      <p className="text-sm text-muted-foreground">7 days • Premium lodges</p>
                    </div>
                    <Badge variant="warning">Limited</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">$4,500/person</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4 mt-4">
              <div className="space-y-3">
                <Label>Next Available Dates</Label>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">March 15-20, 2024</span>
                    <Badge variant="success">Available</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">April 2-7, 2024</span>
                    <Badge variant="warning">2 spots left</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">May 10-15, 2024</span>
                    <Badge variant="destructive">Fully booked</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 mt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold">4.8/5</span>
                <span className="text-muted-foreground">(89 reviews)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Wildlife Sightings</span>
                  <Progress value={95} className="w-24" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Guide Knowledge</span>
                  <Progress value={92} className="w-24" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accommodation</span>
                  <Progress value={88} className="w-24" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Value for Money</span>
                  <Progress value={85} className="w-24" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Contact Information</Label>
                  <div className="space-y-1 text-sm">
                    <p>📧 info@masaisafariexperts.com</p>
                    <p>📞 +254 20 123 4567</p>
                    <p>📍 Nairobi, Kenya</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Quick Inquiry</Label>
                  <div className="space-y-2">
                    <Input placeholder="Your email" />
                    <Textarea placeholder="Your message..." className="min-h-[60px]" />
                    <Button className="w-full">Send Inquiry</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  ),
};
