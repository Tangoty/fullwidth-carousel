import FullWidthCarousel from "./components/FullWidthCarousel";

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
