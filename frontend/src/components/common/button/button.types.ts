import { ReactNode } from 'react';

export enum BUTTON_SIZE {
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}

export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum BUTTON_SHAPE {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
}

export enum BUTTON_ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export interface ButtonProps {
  id: string;
  label?: string;
  size?: BUTTON_SIZE;
  variant?: BUTTON_VARIANT;
  shape?: BUTTON_SHAPE;
  icon?: ReactNode;
  iconPosition?: BUTTON_ICON_POSITION;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  iconColor?: string;
  hasBorder?: boolean;
  backgroundColor?: string;
}
