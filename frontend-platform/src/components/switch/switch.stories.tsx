import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from './switch';
import { ComponentProps, useState } from 'react';
import { Button } from '../button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../card/card';
import { Label } from '../label/label';
import { Badge } from '../badge/badge';
import { Separator } from '../separator/separator';
import { Camera, MapPin, Binoculars, Shield, Moon } from 'lucide-react';

type SwitchProps = ComponentProps<typeof Switch>;

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A switch component built with Radix UI primitives. Perfect for toggling safari tour preferences and settings.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'The controlled checked state of the switch.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'The default checked state when uncontrolled.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled.',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the switch is required.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const SafariBookingPreferences: Story = {
  render: () => {
    const [wildlifeAlerts, setWildlifeAlerts] = useState(true);
    const [weatherUpdates, setWeatherUpdates] = useState(false);
    const [gamedriveReminders, setGamedriveReminders] = useState(true);

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Binoculars className="h-5 w-5" />
            Safari Booking Preferences
          </CardTitle>
          <CardDescription>Customize your safari tour experience notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="wildlife-alerts" className="text-sm font-medium">
                Wildlife Sighting Alerts
              </Label>
              <p className="text-xs text-muted-foreground">
                Get notified about Big Five and rare animal sightings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="wildlife-alerts"
                checked={wildlifeAlerts}
                onCheckedChange={setWildlifeAlerts}
              />
              <Badge variant={wildlifeAlerts ? 'default' : 'secondary'}>
                {wildlifeAlerts ? 'Active' : 'Off'}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weather-updates" className="text-sm font-medium">
                Weather & Safari Conditions
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive updates about weather and optimal game viewing times
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="weather-updates"
                checked={weatherUpdates}
                onCheckedChange={setWeatherUpdates}
              />
              <Badge variant={weatherUpdates ? 'default' : 'secondary'}>
                {weatherUpdates ? 'Active' : 'Off'}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="gamedrive-reminders" className="text-sm font-medium">
                Game Drive Reminders
              </Label>
              <p className="text-xs text-muted-foreground">
                Reminders for upcoming safari activities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="gamedrive-reminders"
                checked={gamedriveReminders}
                onCheckedChange={setGamedriveReminders}
              />
              <Badge variant={gamedriveReminders ? 'default' : 'secondary'}>
                {gamedriveReminders ? 'Active' : 'Off'}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setWildlifeAlerts(true);
              setWeatherUpdates(true);
              setGamedriveReminders(true);
            }}
          >
            Enable All Safari Alerts
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

export const SafariEquipmentSettings: Story = {
  render: () => {
    const [cameraMode, setCameraMode] = useState(false);
    const [gpsTracking, setGpsTracking] = useState(true);
    const [nightVision, setNightVision] = useState(true);

    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Safari Equipment Settings</CardTitle>
          <CardDescription>Configure your safari gear and tracking preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="camera-mode" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Silent Camera Mode
            </Label>
            <Switch id="camera-mode" checked={cameraMode} onCheckedChange={setCameraMode} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="gps-tracking" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              GPS Wildlife Tracking
            </Label>
            <Switch id="gps-tracking" checked={gpsTracking} onCheckedChange={setGpsTracking} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="night-vision" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Night Safari Mode
            </Label>
            <Switch id="night-vision" checked={nightVision} onCheckedChange={setNightVision} />
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const SafariGuideSettings: Story = {
  render: () => {
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [groupCommunication, setGroupCommunication] = useState(true);
    const [animalApproachAlert, setAnimalApproachAlert] = useState(true);

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safari Guide Controls
          </CardTitle>
          <CardDescription>Safety and communication settings for safari guides</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emergency-mode" className="text-sm font-medium text-red-600">
                Emergency Mode
              </Label>
              <p className="text-xs text-muted-foreground">
                Activate emergency protocols and location sharing
              </p>
            </div>
            <Switch
              id="emergency-mode"
              checked={emergencyMode}
              onCheckedChange={setEmergencyMode}
              className={emergencyMode ? 'data-[state=checked]:bg-red-600' : ''}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="group-communication" className="text-sm font-medium">
                Group Communication
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable radio communication with safari group
              </p>
            </div>
            <Switch
              id="group-communication"
              checked={groupCommunication}
              onCheckedChange={setGroupCommunication}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animal-approach" className="text-sm font-medium">
                Animal Approach Alerts
              </Label>
              <p className="text-xs text-muted-foreground">
                Warn when large animals are approaching the vehicle
              </p>
            </div>
            <Switch
              id="animal-approach"
              checked={animalApproachAlert}
              onCheckedChange={setAnimalApproachAlert}
              disabled={emergencyMode}
            />
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          {emergencyMode && (
            <div className="flex items-center gap-2 text-red-600">
              <Shield className="h-3 w-3" />
              Emergency mode active - some settings are locked
            </div>
          )}
        </CardFooter>
      </Card>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch disabled defaultChecked={false} />
        <Label className="text-sm text-muted-foreground">Disabled (Off)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch disabled defaultChecked={true} />
        <Label className="text-sm text-muted-foreground">Disabled (On)</Label>
      </div>
    </div>
  ),
};
