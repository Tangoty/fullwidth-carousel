# Full-Width Carousel

A flexible, performant, full-width React carousel component.

## Features
- ✅ Full screen width
- ✅ Infinite scroll (optional, default `true`)
- ✅ Autoscroll with configurable interval (default `15000` ms)
- ✅ Manual selection dots (optional, default `true`)
- ✅ Pause on hover/focus
- ✅ GPU-accelerated transforms (`translate3d`)
- ✅ Lazy-loads off-screen images
- ✅ Accessible (ARIA roles, keyboard focus)

## Usage

```jsx
import FullWidthCarousel from "./FullWidthCarousel";

const items = [
  { id: "1", imgUri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920" },
  { id: "2", imgUri: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920" },
  { id: "3", imgUri: "https://images.unsplash.com/photo-1469474968028-56623f02d42a?w=1920" },
];

export default function App() {
  return (
    <FullWidthCarousel
      items={items}
      infinite
      autoscroll
      autoscrollInterval={15000}
      dots
      className="h-screen"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ id, imgUri }[]` | `[]` | Carousel slides |
| `infinite` | `boolean` | `true` | Wrap from last to first |
| `autoscroll` | `boolean` | `true` | Auto-advance slides |
| `autoscrollInterval` | `number` | `15000` | ms between auto-advances |
| `dots` | `boolean` | `true` | Show selection dots |
| `className` | `string` | `""` | Extra root classes |
| `imgClassName` | `string` | `""` | Extra image classes |

## Requirements
- React 18+
- Tailwind CSS
