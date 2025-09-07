import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card/card';
import { Label } from '../label/label';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select destination" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kenya">Kenya Safari</SelectItem>
        <SelectItem value="tanzania">Tanzania Safari</SelectItem>
        <SelectItem value="botswana">Botswana Safari</SelectItem>
        <SelectItem value="south-africa">South Africa Safari</SelectItem>
        <SelectItem value="namibia">Namibia Safari</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const TourCategories: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select tour type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Wildlife Safaris</SelectLabel>
          <SelectItem value="big-five">Big Five Safari</SelectItem>
          <SelectItem value="migration">Great Migration</SelectItem>
          <SelectItem value="gorilla">Gorilla Trekking</SelectItem>
          <SelectItem value="bird-watching">Bird Watching</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Adventure Tours</SelectLabel>
          <SelectItem value="mountain-climbing">Mountain Climbing</SelectItem>
          <SelectItem value="hot-air-balloon">Hot Air Balloon</SelectItem>
          <SelectItem value="walking-safari">Walking Safari</SelectItem>
          <SelectItem value="night-safari">Night Safari</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Cultural Tours</SelectLabel>
          <SelectItem value="maasai-village">Maasai Village Visit</SelectItem>
          <SelectItem value="local-markets">Local Markets Tour</SelectItem>
          <SelectItem value="historical-sites">Historical Sites</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const TravelSeason: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Best travel time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Peak Season</SelectLabel>
          <SelectItem value="june-october">June - October (Dry Season)</SelectItem>
          <SelectItem value="december-march">December - March (Migration)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Shoulder Season</SelectLabel>
          <SelectItem value="april-may">April - May (Green Season)</SelectItem>
          <SelectItem value="november">November (Short Rains)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Special Events</SelectLabel>
          <SelectItem value="calving-season">Calving Season (Jan-Mar)</SelectItem>
          <SelectItem value="river-crossing">River Crossing (Jul-Sep)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const BookingForm: Story = {
  render: () => (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Book Your Safari Adventure</CardTitle>
        <CardDescription>
          Choose your perfect safari experience with our comprehensive booking form
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select name="destination">
              <SelectTrigger id="destination">
                <SelectValue placeholder="Choose destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="tanzania">Tanzania</SelectItem>
                <SelectItem value="botswana">Botswana</SelectItem>
                <SelectItem value="south-africa">South Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select name="duration" defaultValue="4-7-days">
              <SelectTrigger id="duration">
                <SelectValue placeholder="Tour length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-day">1 Day</SelectItem>
                <SelectItem value="2-3-days">2-3 Days</SelectItem>
                <SelectItem value="4-7-days">4-7 Days</SelectItem>
                <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select name="budget">
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget ($500-$1,500)</SelectItem>
                <SelectItem value="mid-range">Mid-range ($1,500-$3,000)</SelectItem>
                <SelectItem value="luxury">Luxury ($3,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-size">Group Size</Label>
            <Select name="group-size">
              <SelectTrigger id="group-size">
                <SelectValue placeholder="Number of travelers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo Traveler</SelectItem>
                <SelectItem value="couple">Couple (2)</SelectItem>
                <SelectItem value="family">Family (3-6)</SelectItem>
                <SelectItem value="group">Group (7+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accommodation">Accommodation Preference</Label>
          <Select name="accommodation">
            <SelectTrigger id="accommodation">
              <SelectValue placeholder="Choose accommodation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="camping">Camping</SelectItem>
              <SelectItem value="budget-lodge">Budget Lodge</SelectItem>
              <SelectItem value="luxury-lodge">Luxury Lodge</SelectItem>
              <SelectItem value="luxury-camp">Luxury Tented Camp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Special Interests</Label>
          <Select name="interests">
            <SelectTrigger id="interests">
              <SelectValue placeholder="What interests you most?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="big-five">Big Five Wildlife</SelectItem>
              <SelectItem value="migration">Great Migration</SelectItem>
              <SelectItem value="photography">Photography Safari</SelectItem>
              <SelectItem value="cultural">Cultural Experiences</SelectItem>
              <SelectItem value="adventure">Adventure Activities</SelectItem>
              <SelectItem value="conservation">Conservation Tours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          Find My Perfect Safari
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const TourPackageCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Maasai Mara Classic</CardTitle>
              <CardDescription>3-day wildlife safari experience</CardDescription>
            </div>
            <Badge variant="success">Popular</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">
            $1,299<span className="text-sm font-normal">/person</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="package-duration">Duration</Label>
              <Select defaultValue="3-days">
                <SelectTrigger id="package-duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-days">2 Days - $999</SelectItem>
                  <SelectItem value="3-days">3 Days - $1,299</SelectItem>
                  <SelectItem value="4-days">4 Days - $1,699</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="package-accommodation">Accommodation</Label>
              <Select defaultValue="mid-range">
                <SelectTrigger id="package-accommodation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camping">Camping - $899</SelectItem>
                  <SelectItem value="mid-range">Mid-range Lodge - $1,299</SelectItem>
                  <SelectItem value="luxury">Luxury Lodge - $2,199</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Book Now</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Serengeti Migration</CardTitle>
              <CardDescription>5-day Great Migration tour</CardDescription>
            </div>
            <Badge variant="info">Best Value</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">
            $2,499<span className="text-sm font-normal">/person</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="migration-season">Best Season</Label>
              <Select defaultValue="july-september">
                <SelectTrigger id="migration-season">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>River Crossing</SelectLabel>
                    <SelectItem value="july-september">July - September</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Calving Season</SelectLabel>
                    <SelectItem value="january-march">January - March</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="migration-group">Group Type</Label>
              <Select defaultValue="small-group">
                <SelectTrigger id="migration-group">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private Tour - $3,999</SelectItem>
                  <SelectItem value="small-group">Small Group - $2,499</SelectItem>
                  <SelectItem value="large-group">Large Group - $1,999</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Book Now</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const FormWithLabels: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Safari Preferences</CardTitle>
        <CardDescription>Tell us about your ideal safari experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="preferred-destination">
            Preferred Destination <span className="text-red-500">*</span>
          </Label>
          <Select name="destination" required>
            <SelectTrigger id="preferred-destination">
              <SelectValue placeholder="Select your preferred destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>East Africa</SelectLabel>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="tanzania">Tanzania</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Southern Africa</SelectLabel>
                <SelectItem value="botswana">Botswana</SelectItem>
                <SelectItem value="south-africa">South Africa</SelectItem>
                <SelectItem value="namibia">Namibia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wildlife-interest">Primary Wildlife Interest</Label>
          <Select name="wildlife">
            <SelectTrigger id="wildlife-interest">
              <SelectValue placeholder="What would you most like to see?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="big-five">
                Big Five (Lion, Leopard, Elephant, Buffalo, Rhino)
              </SelectItem>
              <SelectItem value="migration">Great Migration</SelectItem>
              <SelectItem value="primates">Primates (Gorillas, Chimpanzees)</SelectItem>
              <SelectItem value="birds">Bird Watching</SelectItem>
              <SelectItem value="marine">Marine Life</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="travel-style">Travel Style</Label>
          <Select name="style">
            <SelectTrigger id="travel-style">
              <SelectValue placeholder="Choose your travel style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure & Active</SelectItem>
              <SelectItem value="luxury">Luxury & Comfort</SelectItem>
              <SelectItem value="cultural">Cultural Immersion</SelectItem>
              <SelectItem value="photography">Photography Focused</SelectItem>
              <SelectItem value="family">Family Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Save Preferences
        </Button>
        <Button className="flex-1">Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const DisabledSeasons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="travel-month">Select Travel Month</Label>
        <Select>
          <SelectTrigger id="travel-month" className="w-[200px]">
            <SelectValue placeholder="Select travel month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
            <SelectItem value="april" disabled>
              April (Rainy Season)
            </SelectItem>
            <SelectItem value="may" disabled>
              May (Rainy Season)
            </SelectItem>
            <SelectItem value="june">June</SelectItem>
            <SelectItem value="july">July</SelectItem>
            <SelectItem value="august">August</SelectItem>
            <SelectItem value="september">September</SelectItem>
            <SelectItem value="october">October</SelectItem>
            <SelectItem value="november">November</SelectItem>
            <SelectItem value="december">December</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground">
        Note: April and May are disabled due to heavy rainy season conditions that may affect safari
        experiences.
      </p>
    </div>
  ),
};


