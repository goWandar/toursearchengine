import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

// Import ALL discovered existing components for integration
import { Button } from '../button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Textarea } from '../textarea/textarea';
import { Toggle } from '../toggle/toggle';
import { Skeleton } from '../skeleton/skeleton';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Camera,
  Binoculars,
  Tent,
  Info,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Heart,
  Share,
  Bookmark,
  DollarSign,
  Phone,
  Mail,
  Globe,
  Award,
  Shield,
  Zap,
  Target,
  Eye,
  Settings,
} from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip component for displaying helpful information on hover or focus. Perfect for providing additional context in safari tour booking interfaces without cluttering the UI.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

export const Default: Story = {
  render: () => (
    <TooltipWrapper>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for safari info</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Big Five safari tours available in Serengeti National Park</p>
        </TooltipContent>
      </Tooltip>
    </TooltipWrapper>
  ),
};

export const SafariTourBooking: Story = {
  render: () => (
    <TooltipWrapper>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Serengeti Big Five Safari
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>5-day guided safari with guaranteed Big Five sightings</p>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <CardDescription>Tanzania • 5 days • All-inclusive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Big Five</Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">
                    Premium
                    <Award className="ml-1 h-3 w-3" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Luxury lodges, private guides, and exclusive game drives</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.9</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on 247 verified safari guest reviews</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Group Size
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="2 guests" />
                    </SelectTrigger>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maximum 8 guests per vehicle for optimal wildlife viewing</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget Range
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="px-3">
                    <Slider defaultValue={[3500]} max={8000} min={1500} step={250} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price includes accommodation, meals, park fees, and transfers</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to wishlist</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share safari tour</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button>Book Safari - $3,500</Button>
        </CardFooter>
      </Card>
    </TooltipWrapper>
  ),
};

export const TourOperatorProfile: Story = {
  render: () => (
    <TooltipWrapper>
      <Card className="w-80">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-operator.jpg" alt="Safari operator" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                Masai Kili Safaris
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="cursor-help">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Licensed operator with 15+ years experience and safety certification</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>Tanzania • Since 2008</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span className="text-sm text-muted-foreground">(156 reviews)</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="cursor-help">
                  <Award className="mr-1 h-3 w-3" />
                  Excellence
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>TripAdvisor Certificate of Excellence 2023</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-2">
            <Label>Specializations</Label>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="cursor-help">
                    <Camera className="mr-1 h-3 w-3" />
                    Photography
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Professional photography safaris with expert guides</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="cursor-help">
                    <Binoculars className="mr-1 h-3 w-3" />
                    Wildlife
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Big Five tracking and bird watching expeditions</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="cursor-help">
                    <Tent className="mr-1 h-3 w-3" />
                    Camping
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Authentic bush camping experiences under the stars</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span>Response Rate</span>
            <div className="flex items-center gap-2">
              <Progress value={95} className="w-16" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-medium cursor-help">95%</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Responds to inquiries within 2 hours on average</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call: +255 123 456 789</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email: info@masaikili.com</p>
            </TooltipContent>
          </Tooltip>
          <Button className="flex-1">View Tours</Button>
        </CardFooter>
      </Card>
    </TooltipWrapper>
  ),
};
