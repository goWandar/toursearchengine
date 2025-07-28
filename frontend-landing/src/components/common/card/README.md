# Card Component

The card component supports different variants, alignments, and optional features like dividers and learn more buttons.

## Props

| Prop             | Type           | Required | Default | Description                             |
| ---------------- | -------------- | -------- | ------- | --------------------------------------- |
| id               | string         | Yes      | -       | Unique identifier for the card          |
| icon             | ReactNode      | No       | -       | Icon to display at the top of the card  |
| title            | string         | Yes      | -       | Card title                              |
| description      | string         | Yes      | -       | Card description                        |
| alignment        | CARD_ALIGNMENT | No       | CENTER  | Text alignment (LEFT, CENTER, RIGHT)    |
| variant          | CARD_VARIANT   | No       | PRIMARY | Card style variant (PRIMARY, SECONDARY) |
| className        | string         | No       | ''      | Additional CSS classes                  |
| showDivider      | boolean        | No       | false   | Whether to show a divider               |
| showLearnMore    | boolean        | No       | false   | Whether to show a learn more button     |
| onLearnMoreClick | () => void     | No       | -       | Click handler for learn more button     |
| textColor        | string         | No       | -       | Custom text color                       |
| learnMoreButton  | ReactNode      | No       | -       | Custom learn more button component      |

## Examples

### Basic Card

```tsx
<Card
  id='basic-card'
  title='Basic Card'
  description='A simple card with title and description'
  alignment={CARD_ALIGNMENT.CENTER}
  variant={CARD_VARIANT.PRIMARY}
/>
```

### Card with Icon

```tsx
<Card
  id='icon-card'
  icon={<FaCompass />}
  title='Card with Icon'
  description='A card that includes an icon at the top'
  alignment={CARD_ALIGNMENT.CENTER}
  variant={CARD_VARIANT.PRIMARY}
/>
```

### Secondary Variant Card

```tsx
<Card
  id='secondary-card'
  icon={<FaMapMarkedAlt />}
  title='Secondary Card'
  description='A card using the secondary variant with brown background'
  alignment={CARD_ALIGNMENT.CENTER}
  variant={CARD_VARIANT.SECONDARY}
/>
```

### Card with Divider and Learn More

```tsx
<Card
  id='full-featured-card'
  icon={<FaCompass />}
  title='Full Featured Card'
  description='A card with all features enabled'
  alignment={CARD_ALIGNMENT.CENTER}
  variant={CARD_VARIANT.PRIMARY}
  showDivider={true}
  showLearnMore={true}
  onLearnMoreClick={() => console.log('Learn more clicked')}
/>
```

### Left Aligned Card

```tsx
<Card
  id='left-aligned-card'
  icon={<FaCompass />}
  title='Left Aligned'
  description='A card with left-aligned text'
  alignment={CARD_ALIGNMENT.LEFT}
  variant={CARD_VARIANT.PRIMARY}
/>
```

### Custom Text Color

```tsx
<Card
  id='custom-color-card'
  icon={<FaCompass />}
  title='Custom Color'
  description='A card with custom text color'
  alignment={CARD_ALIGNMENT.CENTER}
  variant={CARD_VARIANT.PRIMARY}
  textColor='text-primary-brown'
/>
```
