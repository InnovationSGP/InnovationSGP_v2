# Services Components

This directory contains components for the `/services` landing page and individual service pages.

## Main Components

### ServicesHero

- **File:** `services-hero.tsx`
- **Description:** Main hero component for the services landing page
- **Props:**
  - `title`: Main heading text
  - `subtitle`: Text displayed in the badge above the title
  - `description`: Hero description text
  - `backgroundImage`: Path to background image (defaults to "/images/services.avif")
  - `ctaText`: Call-to-action button text
  - `ctaLink`: Call-to-action button link
  - `highlightPattern`: Pattern for highlighting words in title ("alternate", "bookend", or "middle")

### ServiceCards

- **File:** `service-cards.tsx`
- **Description:** Grid display of all services with images and descriptions
- **Props:**
  - `services`: Array of service objects from the API

### ServiceProcess

- **File:** `service-process.tsx`
- **Description:** Displays the service delivery process steps
- **Props:**
  - `title`: Process section title
  - `subtitle`: Text displayed in the badge above the title
  - `steps`: Array of process step objects (title, description, icon)

### ServiceStats

- **File:** `service-stats.tsx`
- **Description:** Animated statistics display
- **Props:**
  - `stats`: Array of statistic objects (value, label, icon)

### ClientTestimonials

- **File:** `client-testimonials.tsx`
- **Description:** Client testimonial carousel/slider
- **Props:**
  - `testimonials`: Array of testimonial objects (name, position, company, image, quote, rating)

## Usage Example

```tsx
// In services/page.tsx
import ServicesHero from "@/template/services/services-hero";
import ServiceCards from "@/template/services/service-cards";
import ServiceProcess from "@/template/services/service-process";
import ServiceStats from "@/template/services/service-stats";
import ClientTestimonials from "@/template/services/client-testimonials";

// Data structure example
const services_data = {
  services_title: "Our Professional Services",
  services_subtitle: "Expert Solutions for Business",
  services_description: "Comprehensive range of services...",
  services_background_image: "/images/services-bg.jpg",
  services_cta_button_text: "Explore Our Services",
  services_cta_button_link: "#services-grid",
  services_process_title: "Our Proven Process",
  services_process_subtitle: "How We Work",
  services_process_steps: [
    {
      title: "Discovery",
      description: "Understanding your business needs...",
      icon: "search",
    },
    // More steps...
  ],
  services_stats: [
    {
      value: "500+",
      label: "Projects Completed",
      icon: "checkCircle",
    },
    // More stats...
  ],
  services_testimonials: [
    {
      name: "John Smith",
      position: "CEO",
      company: "Tech Company",
      image: "/images/john.jpg",
      quote: "Great service and results...",
      rating: 5,
    },
    // More testimonials...
  ],
};

// Then in your component:
<ServicesHero
  title={services_data.services_title}
  subtitle={services_data.services_subtitle}
  description={services_data.services_description}
  backgroundImage={services_data.services_background_image}
  ctaText={services_data.services_cta_button_text}
  ctaLink={services_data.services_cta_button_link}
/>;
```

## Implementation Notes

- All components are responsive and work across all device sizes
- Components use a consistent design language with gradients, highlights, and animations
- Error handling is included for missing or incomplete data
- Performance optimizations include:
  - Lazy loading images
  - Fixed particle positions instead of random generation
  - Efficient animation using CSS transitions
