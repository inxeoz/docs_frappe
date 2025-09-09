# Responsive Design Testing Guide

## Breakpoints Overview

| Device Category | Width Range | CSS Variables |
|----------------|-------------|---------------|
| Mobile (Portrait) | 320px - 640px | `--breakpoint-sm: 640px` |
| Mobile (Landscape) / Small Tablet | 640px - 768px | `--breakpoint-md: 768px` |
| Tablet | 768px - 1024px | `--breakpoint-lg: 1024px` |
| Desktop | 1024px - 1280px | `--breakpoint-xl: 1280px` |
| Large Desktop | 1280px+ | `--breakpoint-2xl: 1536px` |

## Key Responsive Features

### 1. Sidebar Behavior
- **Desktop (>900px)**: Fixed sidebar, always visible
- **Mobile (≤900px)**: Overlay sidebar with backdrop blur
- **Tablet**: Contextual based on content needs

### 2. Typography Scaling
- **Fluid typography**: Uses `clamp()` for responsive scaling
- **Code blocks**: Smaller font sizes on mobile
- **Headings**: Dynamic sizing based on viewport

### 3. Navigation
- **Desktop**: Horizontal layout with hover effects
- **Mobile**: Stacked vertical layout
- **Animations**: Smooth transitions across all breakpoints

### 4. Content Layout
- **Wide screens**: Maximum content width with centered layout
- **Medium screens**: Reduced padding, optimized line length
- **Mobile**: Single column, increased line height

## Testing Checklist

### Mobile (320px - 640px)
- [ ] Sidebar opens/closes smoothly
- [ ] Navigation buttons stack vertically
- [ ] Code blocks remain readable
- [ ] Touch targets are ≥44px
- [ ] No horizontal scroll

### Tablet (640px - 1024px)
- [ ] Sidebar behavior transitions properly
- [ ] Content remains readable
- [ ] Interactive elements are appropriately sized
- [ ] Images scale correctly

### Desktop (1024px+)
- [ ] Sidebar is always visible
- [ ] Hover states work correctly
- [ ] Content doesn't exceed max-width
- [ ] All animations are smooth

## Performance Considerations

### Critical Rendering Path
1. Common CSS loads first (variables, resets)
2. Layout-specific CSS (sidebar, content)
3. Enhancement CSS (animations, effects)

### Progressive Enhancement
- Base functionality works without JavaScript
- Animations respect `prefers-reduced-motion`
- Dark mode follows system preferences
- High contrast mode supported

## Accessibility Features

### Keyboard Navigation
- Tab order is logical
- Focus indicators are visible
- Skip links available
- ARIA attributes properly set

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Live regions for dynamic content

## Browser Support

### Modern Features (Progressive Enhancement)
- CSS Custom Properties (IE11+)
- CSS Grid (Edge 16+, Safari 10.1+)
- Backdrop Filter (Safari 9+, Chrome 76+)
- Container Queries (Chrome 105+, Firefox 110+)

### Fallbacks
- Flexbox for older browsers
- Traditional positioning for IE
- Basic animations for reduced motion