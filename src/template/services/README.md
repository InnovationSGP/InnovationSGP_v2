# Services Hero Component

This component provides a visually enhanced hero section for service pages with consistent styling that matches the site's design system.

## Features

- Gradient background with image overlay
- Animated background elements
- Floating particles
- Highlighted title words with gradient text
- Breadcrumb navigation
- Responsive design
- Animation support

## Usage

### Basic Usage

```tsx
import Hero from "@/template/services/hero";

// In your page component
<Hero
  title="Strategic Business Consulting"
  excerpt="We help businesses transform through strategic planning and execution."
/>;
```

### With Custom Background Image

```tsx
<Hero
  title="Financial Advisory Services"
  excerpt="Expert financial guidance for businesses of all sizes."
  backgroundImage="/images/finance-bg.jpg"
/>
```

### With Custom Title Highlighting

```tsx
<Hero
  title="Digital Transformation Solutions"
  excerpt="Modernize your business with cutting-edge technology."
  highlightPattern="bookend" // Highlights first and last words
/>
```

Available highlight patterns:

- `alternate` (default): Highlights every other word
- `bookend`: Highlights first and last words
- `middle`: Highlights all words except first and last

### With Custom Breadcrumb

```tsx
<Hero
  title="IT Consulting"
  excerpt="Enterprise technology solutions for modern businesses."
  breadcrumb={[
    { text: "Home", href: "/" },
    { text: "Solutions", href: "/solutions" },
    { text: "Technology", href: "/solutions/technology" },
  ]}
/>
```

## Animation Support

For animated entrance effects, use the AnimatedHero component:

```tsx
import AnimatedHero from "@/template/services/animated-hero";

<AnimatedHero
  title="Project Management"
  excerpt="Expert project delivery and oversight."
/>;
```

## Props

| Prop               | Type                                 | Default                 | Description                                      |
| ------------------ | ------------------------------------ | ----------------------- | ------------------------------------------------ |
| `title`            | string                               | Required                | The main heading for the hero section            |
| `excerpt`          | string                               | Required                | HTML content for the description (supports HTML) |
| `backgroundImage`  | string                               | "/images/services.avif" | Path to the background image                     |
| `highlightPattern` | 'alternate' \| 'bookend' \| 'middle' | "alternate"             | Pattern for highlighting words in the title      |
| `breadcrumb`       | Array of {text, href}                | Home + Services         | Navigation breadcrumb items                      |
