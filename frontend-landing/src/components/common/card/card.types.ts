import { ReactNode } from 'react';

export enum CARD_ALIGNMENT {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum CARD_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface CardProps {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  alignment?: CARD_ALIGNMENT;
  variant?: CARD_VARIANT;
  className?: string;
  showDivider?: boolean;
  showLearnMore?: boolean;
  onLearnMoreClick?: () => void;
  textColor?: string;
  learnMoreButton?: ReactNode;
}
