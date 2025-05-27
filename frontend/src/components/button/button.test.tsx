import { render, screen, fireEvent } from '@testing-library/react';
import Button, {
  BUTTON_ICON_POSITION,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from './button.component';
import { FaSearch } from 'react-icons/fa';

describe('Button Component', () => {
  // Test basic rendering
  it('renders button with label', () => {
    render(<Button label='Test Button' />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  // Test icon-only button
  it('renders icon-only button', () => {
    render(<Button icon={<FaSearch />} />);
    expect(screen.getByTestId('FaSearch')).toBeInTheDocument();
  });

  // Test button with label and icon
  it('renders button with label and icon', () => {
    render(
      <Button
        label='Search'
        icon={<FaSearch data-testid='search-icon' />}
        iconPosition={BUTTON_ICON_POSITION.LEFT}
      />,
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  // Test different variants
  it.each([
    [BUTTON_VARIANT.PRIMARY, 'bg-primary-500'],
    [BUTTON_VARIANT.SECONDARY, 'bg-secondary-500'],
    [BUTTON_VARIANT.TERTIARY, 'bg-transparent'],
  ])('applies correct styles for %s variant', (variant, expectedClass) => {
    render(<Button label='Test' variant={variant} />);
    const button = screen.getByText('Test');
    expect(button.className).toContain(expectedClass);
  });

  // Test different sizes
  it.each([
    [BUTTON_SIZE.SMALL, 'text-sm'],
    [BUTTON_SIZE.NORMAL, 'text-base'],
    [BUTTON_SIZE.LARGE, 'text-lg'],
  ])('applies correct styles for %s size', (size, expectedClass) => {
    render(<Button label='Test' size={size} />);
    const button = screen.getByText('Test');
    expect(button.className).toContain(expectedClass);
  });

  // Test different shapes
  it.each([
    [BUTTON_SHAPE.RECTANGLE, 'rounded-md'],
    [BUTTON_SHAPE.CIRCLE, 'rounded-full'],
  ])('applies correct styles for %s shape', (shape, expectedClass) => {
    render(<Button label='Test' shape={shape} />);
    const button = screen.getByText('Test');
    expect(button.className).toContain(expectedClass);
  });

  // Test icon positions
  it.each([
    [BUTTON_ICON_POSITION.LEFT, 'mr-2'],
    [BUTTON_ICON_POSITION.RIGHT, 'ml-2'],
    [BUTTON_ICON_POSITION.TOP, 'mb-2'],
    [BUTTON_ICON_POSITION.BOTTOM, 'mt-2'],
  ])('applies correct spacing for %s icon position', (position, expectedClass) => {
    render(<Button label='Test' icon={<FaSearch data-testid='icon' />} iconPosition={position} />);
    const icon = screen.getByTestId('icon').parentElement;
    expect(icon?.className).toContain(expectedClass);
  });

  // Test click handler
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label='Test' onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test disabled state
  it('applies disabled styles and prevents click when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label='Test' disabled onClick={handleClick} />);
    const button = screen.getByText('Test');

    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test custom colors
  it('applies custom text and icon colors', () => {
    render(
      <Button
        label='Test'
        icon={<FaSearch data-testid='icon' />}
        textColor='text-red-500'
        iconColor='text-blue-500'
      />,
    );
    const button = screen.getByText('Test');
    const icon = screen.getByTestId('icon').parentElement;

    expect(button.className).toContain('text-red-500');
    expect(icon?.className).toContain('text-blue-500');
  });

  // Test button type
  it.each([
    ['button', 'button'],
    ['submit', 'submit'],
    ['reset', 'reset'],
  ])('renders with correct type %s', (type, expectedType) => {
    render(<Button label='Test' type={type as 'button' | 'submit' | 'reset'} />);
    expect(screen.getByText('Test')).toHaveAttribute('type', expectedType);
  });
});
