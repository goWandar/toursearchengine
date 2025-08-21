import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Progress } from './progress'
import { useState, useEffect } from 'react'
import { Button } from '@/components/button/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/card'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A progress indicator that shows the completion progress of a task, typically displayed as a progress bar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
    className: 'w-80',
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    className: 'w-80',
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    className: 'w-80',
  },
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small (h-2)</p>
        <Progress value={33} className="h-2" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Default (h-4)</p>
        <Progress value={66} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large (h-6)</p>
        <Progress value={90} className="h-6" />
      </div>
    </div>
  ),
}

export const DifferentValues: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Low Progress</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Medium Progress</span>
          <span>50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>High Progress</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
}

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div className="space-y-4 w-80">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <Button
          onClick={() => setProgress(Math.floor(Math.random() * 100))}
          size="sm"
        >
          Randomize Progress
        </Button>
      </div>
    )
  },
}

export const FileUploadProgress: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const simulateUpload = () => {
      setIsUploading(true)
      setUploadProgress(0)
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
    }

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Upload your files with progress tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>document.pdf</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
            <p className="text-xs text-muted-foreground">
              {isUploading ? 'Uploading...' : uploadProgress === 100 ? 'Upload complete!' : 'Ready to upload'}
            </p>
          </div>
          <Button 
            onClick={simulateUpload} 
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </CardContent>
      </Card>
    )
  },
}

export const MultipleProgressBars: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Project Tasks</h4>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Design</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Development</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Testing</span>
              <span>40%</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Deployment</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom Colors</p>
        <Progress 
          value={60} 
          className="h-3 bg-red-100 [&>div]:bg-red-500" 
        />
        <Progress 
          value={80} 
          className="h-3 bg-green-100 [&>div]:bg-green-500" 
        />
        <Progress 
          value={45} 
          className="h-3 bg-blue-100 [&>div]:bg-blue-500" 
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Rounded Variants</p>
        <Progress value={70} className="h-2 rounded-none" />
        <Progress value={70} className="h-2 rounded-sm" />
        <Progress value={70} className="h-2 rounded-full" />
      </div>
    </div>
  ),
}