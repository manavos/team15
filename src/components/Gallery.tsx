"use client";

import { useState } from "react";

const images = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXYb9vMq5p5NMAv5-WnNzhrDONn2c1ipbBSWFI6Gs5le8x_lwSc_3vRqE&s=10",
    alt: "Iced latte",
  },
  {
    src: "https://vintagekitchennotes.com/wp-content/uploads/2023/07/Tall-glasses-of-passionfruit-tea.jpeg",
    alt: "Fruit tea",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgfRg59hvXevs1lDLO1ugyhY3nhLSenSyQmAO10cTmc0lmwif4Z7I_uM&s=10",
    alt: "Pastry",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="gallery">
      <button className="gallery-button" aria-label="Previous image" onClick={previousImage}>
        ←
      </button>

      <div className="gallery-image-wrapper">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
      </div>

      <button className="gallery-button" aria-label="Next image" onClick={nextImage}>
        →
      </button>
    </div>
  );
}
