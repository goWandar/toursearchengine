import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HamburgerMenu } from './hamburger-menu';

const meta: Meta<typeof HamburgerMenu> = {
  title: 'Recipes/HamburgerMenu',
  component: HamburgerMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InNavbar: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Wandar</div>
          <Story />
        </div>
      </div>
    ),
  ],
};
