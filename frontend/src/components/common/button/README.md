# Button Component

This button component supports different variants, sizes, shapes, and optional features like icons, icon color, background color, disabled state, and custom styling.

## Props

| Prop            | Type                            | Required | Default   | Description                                                    |
| --------------- | ------------------------------- | -------- | --------- | -------------------------------------------------------------- |
| id              | string                          | Yes      | -         | Unique identifier for the button                               |
| label           | string                          | No       | -         | Button text                                                    |
| variant         | BUTTON_VARIANT                  | No       | PRIMARY   | Button style (PRIMARY, SECONDARY, TERTIARY)                    |
| size            | BUTTON_SIZE                     | No       | NORMAL    | Button size (SMALL, NORMAL, LARGE)                             |
| shape           | BUTTON_SHAPE                    | No       | RECTANGLE | Button shape (RECTANGLE, ROUNDED, CIRCLE)                      |
| icon            | ReactNode                       | No       | -         | Icon to display in the button                                  |
| iconPosition    | BUTTON_ICON_POSITION            | No       | LEFT      | Icon position (LEFT, RIGHT, TOP, BOTTOM, CENTER)               |
| onClick         | () => void                      | No       | -         | Click handler                                                  |
| className       | string                          | No       | ''        | Additional CSS classes                                         |
| hasBorder       | boolean                         | No       | true      | Whether to show button border                                  |
| textColor       | string                          | No       | -         | Custom text color (e.g., 'text-neutral-700' or 'text-red-500') |
| iconColor       | string                          | No       | -         | Custom icon color (e.g., '#fff', 'text-primary-500')           |
| backgroundColor | string                          | No       | -         | Custom background color (e.g., '#f0f0f0', 'bg-primary-500')    |
| disabled        | boolean                         | No       | false     | Whether the button is disabled                                 |
| type            | 'button' \| 'submit' \| 'reset' | No       | 'button'  | Button type                                                    |

## Examples

### Primary Button

```tsx
<Button
  id='primary-button'
  label='Primary Button'
  variant={BUTTON_VARIANT.PRIMARY}
  size={BUTTON_SIZE.NORMAL}
  onClick={() => console.log('Clicked')}
/>
```

### Secondary Button with Icon (Right)

```tsx
<Button
  id='secondary-button'
  label='Secondary Button'
  variant={BUTTON_VARIANT.SECONDARY}
  size={BUTTON_SIZE.NORMAL}
  icon={<FaHeart />}
  iconPosition={BUTTON_ICON_POSITION.RIGHT}
  onClick={() => console.log('Clicked')}
/>
```

### Tertiary Button (Disabled)

```tsx
<Button
  id='tertiary-button'
  label='Tertiary Button'
  variant={BUTTON_VARIANT.TERTIARY}
  size={BUTTON_SIZE.NORMAL}
  disabled={true}
  onClick={() => console.log('Clicked')}
/>
```

### Small Icon Button (Circle, Icon Only)

```tsx
<Button
  id='icon-button'
  variant={BUTTON_VARIANT.PRIMARY}
  size={BUTTON_SIZE.SMALL}
  shape={BUTTON_SHAPE.CIRCLE}
  icon={<FaSearch />}
  onClick={() => console.log('Clicked')}
/>
```

### Borderless Button with Custom Text Color

```tsx
<Button
  id='borderless-button'
  label='Borderless Button'
  variant={BUTTON_VARIANT.TERTIARY}
  size={BUTTON_SIZE.NORMAL}
  hasBorder={false}
  textColor='text-neutral-700'
  className='hover:text-primary-500'
  onClick={() => console.log('Clicked')}
/>
```

### Large Button with Custom Background Color

```tsx
<Button
  id='large-button'
  label='Large Button'
  variant={BUTTON_VARIANT.PRIMARY}
  size={BUTTON_SIZE.LARGE}
  backgroundColor='#f0f0f0'
  onClick={() => console.log('Clicked')}
/>
```

### Rounded Button

```tsx
<Button
  id='rounded-button'
  label='Rounded Button'
  variant={BUTTON_VARIANT.PRIMARY}
  shape={BUTTON_SHAPE.ROUNDED}
  onClick={() => console.log('Clicked')}
/>
```

### Button with Custom Icon Color

```tsx
<Button
  id='icon-color-button'
  label='Icon Color Button'
  icon={<FaStar />}
  iconColor='#FFD700'
  onClick={() => console.log('Clicked')}
/>
```

### Button with Icon Position Top

```tsx
<Button
  id='icon-top-button'
  label='Top Icon'
  icon={<FaArrowUp />}
  iconPosition={BUTTON_ICON_POSITION.TOP}
  onClick={() => console.log('Clicked')}
/>
```

### Button with Icon Position Bottom

```tsx
<Button
  id='icon-bottom-button'
  label='Bottom Icon'
  icon={<FaArrowDown />}
  iconPosition={BUTTON_ICON_POSITION.BOTTOM}
  onClick={() => console.log('Clicked')}
/>
```

### Button with Icon Position Center (Icon Only)

```tsx
<Button
  id='icon-center-button'
  icon={<FaDotCircle />}
  iconPosition={BUTTON_ICON_POSITION.CENTER}
  shape={BUTTON_SHAPE.CIRCLE}
  onClick={() => console.log('Clicked')}
/>
```
