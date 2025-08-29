import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

import { Button } from '../button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardMedia,
} from '../card/card';
import { Badge } from '../badge/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/select';
import { Separator } from '../separator/separator';
import { Alert, AlertDescription } from '../alert/alert';
import { Progress } from '../progress/progress';
import { Slider } from '../slider/slider';
import { Switch } from '../switch/switch';
import { Skeleton } from '../skeleton/skeleton';
import { AspectRatio } from '../aspect-ratio/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/tooltip';
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Camera,
  Binoculars,
  Tent,
  Clock,
  DollarSign,
  Heart,
  Share,
  Bookmark,
  Filter,
  Search,
  Eye,
  Award,
  Shield,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A breadcrumb navigation component that shows the current page location within a navigational hierarchy. Perfect for safari tour browsing and booking flows.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/tours">Safari Tours</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Serengeti National Park</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const SafariTourBookingFlow: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/destinations">Destinations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/destinations/tanzania">Tanzania</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/destinations/tanzania/serengeti">Serengeti</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>5-Day Big Five Safari</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Safari Tour Details Card */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Award className="h-3 w-3 mr-1" />
                  Premium Safari
                </Badge>
                <Badge variant="outline">
                  <Users className="h-3 w-3 mr-1" />
                  Max 8 guests
                </Badge>
              </div>
              <CardTitle className="text-2xl">5-Day Big Five Safari Experience</CardTitle>
              <CardDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Serengeti National Park, Tanzania
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />5 Days / 4 Nights
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  4.9 (127 reviews)
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Share via email</DropdownMenuItem>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Share on social media</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Safari Images */}
          <CardMedia>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 mx-auto" />
                  <p className="text-lg font-semibold">Serengeti Wildlife Photography</p>
                  <p className="text-sm opacity-90">
                    Capture the Big Five in their natural habitat
                  </p>
                </div>
              </div>
            </AspectRatio>
          </CardMedia>

          {/* Tour Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Safari Highlights</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Binoculars className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Big Five wildlife viewing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tent className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Luxury tented camp accommodation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Professional photography guidance</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Tour Operator</Label>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/safari-operator.jpg" />
                      <AvatarFallback>SO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Serengeti Safari Experts</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>Licensed & Insured</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.9/5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="itinerary">
              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  Detailed day-by-day itinerary with game drive schedules and meal times.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="inclusions">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="accommodation" checked disabled />
                  <Label htmlFor="accommodation">4 nights luxury tented camp</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="meals" checked disabled />
                  <Label htmlFor="meals">All meals and beverages</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="transport" checked disabled />
                  <Label htmlFor="transport">4WD safari vehicle with pop-up roof</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
                  </div>
                </div>
                <Progress value={95} className="w-full" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">$2,850</span>
              <span className="text-sm text-muted-foreground">per person</span>
            </div>
            <p className="text-xs text-muted-foreground">All inclusive pricing</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Quick View
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Safari Tour Quick View</DialogTitle>
                  <DialogDescription>
                    Get a quick overview of this amazing safari experience.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Book Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};
