# Footer Component Structure

This folder contains the footer components for the website. We've structured it to properly separate client and server components to avoid the "async Client Component" error.

## Component Files

- `index.tsx`: Entry point that exports the footer component
- `footer.tsx`: Server component wrapper with Suspense and error boundary
- `footer-server.tsx`: Server component that handles data fetching and rendering
- `footer-client.tsx`: Client components that handle interactive elements
- `footer-client-wrapper.tsx`: Client-side wrapper for handling client interactions
- `cta-section.tsx`: The call-to-action section component (client component)
- `simple-fallback-footer.tsx`: Simplified footer for loading/error states
- `footer-data.ts`: Data fetching and normalization logic (utility file)

## External Components Used

- `WhyChoseUs` from `@/template/home-page/why-chose-us.tsx`

## Architecture Overview

The footer is split into multiple components following Next.js best practices:

```
index.tsx → footer.tsx (Server) → footer-server.tsx (Server/Async) → {Client Components}
```

Key principles of this architecture:

1. **Server Components**: Handle data fetching (`footer-server.tsx`) and are wrapped with `Suspense`
2. **Client Components**: Handle user interactions and are dynamically imported with proper fallbacks
3. **Clear Separation**: Server components do not have `"use client"` directives
4. **Data Flow**: Data is fetched in server components and passed to client components as props

## Async/Client Component Error Prevention

The specific error `<Footer> is an async Client Component` occurs when:

- A component has both the `"use client"` directive AND async functions
- OR a client component directly imports a server component with async functions

Our solution:

1. Make `footer.tsx` a server component (removed `"use client"` directive)
2. Use `footer-client-wrapper.tsx` for any client-side only interactions
3. Ensure proper dynamic imports with `next/dynamic` for client components
4. Maintain a clear boundary between server and client code

## Preventing Errors and Infinite Loops

1. **Async Error Prevention**:

   - Only server components use async/await
   - Client components are always synchronous

2. **Infinite Loop Prevention**:

   - Client components never directly import server components
   - Server components use dynamic imports for client components
   - We use Suspense boundaries to prevent cascading errors

3. **Error Handling**:
   - Error boundaries at multiple levels
   - Fallback components for loading/error states
   - Comprehensive data normalization with sensible defaults

## Usage

To use the footer, simply import the default export from the index:

```tsx
import Footer from "@/components/footer";

// In your layout or page
<Footer />;
```

## Customization

The footer data is fetched from the API but has comprehensive defaults if API calls fail.
Styling follows the site's design system with a consistent dark blue gradient background.

## Performance Considerations

- Animations are optimized for performance
- Background elements use proper opacity and blur settings
- Suspense is used for improved loading experience
- Components lazy-load when appropriate
