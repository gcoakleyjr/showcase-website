import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

export type imageProps = {
  title: string;
  images: string;
};

export function getImages(): imageProps[] {
  const library: imageProps[] = [
    {
      title: "RareCircles",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265874/www.rarecircles.com__zebjze.png",
    },
    {
      title: "Eyeland Framez",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/eyelandframez_atmfid.jpg",
    },
    {
      title: "Kijiji Mapper",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/kijiji_n6ik6j.jpg",
    },
    {
      title: "MapTO",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/mapto_sjqvs4.jpg",
    },
    {
      title: "Watchlist",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265872/gappicjr_wall_of_movie_posters_c7d98aec-1613-4aa8-b723-1a39078122df_yhxtth.png",
    },
    {
      title: "Quizzical",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265875/quizzical_yhewed.jpg",
    },
    {
      title: "3D Visualizations",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624516/img_1_wwkwit.jpg",
    },
  ];

  return library;
}

export const IMAGE_SELECTOR_MOTION: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
};

export const IMAGE_SELECTOR_ITEM_MOTION: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
