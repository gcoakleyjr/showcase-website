import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

export type imageProps = {
  title: string;
  description: string;
  images: string;
  gitLink?: string;
  siteLink?: string;
  tech?: string[];
};

export function getImages(): imageProps[] {
  const library: imageProps[] = [
    {
      title: "RareCircles",
      tech: ["nextjs", "graphQL", "vanilla extract", "postgres", "golang"],
      siteLink: "https://www.rarecircles.com",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265874/www.rarecircles.com__zebjze.png",
      description:
        "Web3/Web2 social platform for brands to drive community engagement and gain feedback on theirproduct. Involved in the beginning architecture to continuous development. Worked on new deliveryingfeatures, graphql integrations, ui library development and animation.",
    },
    {
      title: "Eyeland Framez",
      tech: ["react", "stipe", "nodejs", "mongodb"],
      siteLink: "https://www.eyelandframez.com",
      gitLink: "https://github.com/gcoakleyjr/eyeland-frames-client",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/eyelandframez_atmfid.jpg",
      description:
        "Ecommerce client project displaying a wide range of fashion eye-wear. Node.js REST API used to fetch user and product data from MongoDB storage. Uses Stripe for purchasing, JSON Web Tokens for authentication & Redux for state management. Developed Admin CMS Portal to display and manage shop content.",
    },
    {
      title: "Kijiji Mapper",
      tech: ["react", "mui", "nodejs", "express"],
      siteLink: "https://kijijimapper.netlify.app/",
      gitLink: "https://github.com/gcoakleyjr/kijijirentals",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/kijiji_n6ik6j.jpg",
      description:
        "A fullstack application developed using React.js and Material UI for a high-fidelity UX/UI design and Node.js and Express.js server to create an API used to fetch rental information for a client.",
    },
    {
      title: "MapTO",
      tech: ["nodejs", "express", "ejs", "mongodb"],
      siteLink: "https://mapto.herokuapp.com/",
      gitLink: "https://github.com/gcoakleyjr/torontomapapp",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265871/mapto_sjqvs4.jpg",
      description:
        "A MERN stack application focused on using MongoDB and Mongoose ODM for storing user-generated data, and then displayed on a map of Toronto. Utilizes Passport for user authentication, algorithms for trending posts, and EJS for displaying all of the data.",
    },
    {
      title: "Watchlist",
      tech: ["react", "javascript"],
      siteLink: "https://gcoakleyjr.github.io/moviewatchlist.github.io/",
      gitLink: "https://github.com/gcoakleyjr/moviewatchlist.github.io",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265872/gappicjr_wall_of_movie_posters_c7d98aec-1613-4aa8-b723-1a39078122df_yhxtth.png",
      description:
        "A Watchlist app that saves all your favorite or soon to be favorite movies into a list that you can always come back to. Uses the IMDB Movie API and styled with CSS.",
    },
    {
      title: "Quizzical",
      tech: ["react", "javascript"],
      siteLink: "https://quizzicalgc.netlify.app/",
      gitLink: "https://github.com/gcoakleyjr/quizzical",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1688265875/quizzical_yhewed.jpg",
      description:
        "A React Quiz App that uses the Opentdb API to source quiz question and answers of different categories.",
    },
    {
      title: "3D Visualizations",
      siteLink: "https://gioco.netlify.app",
      images:
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624516/img_1_wwkwit.jpg",
      description:
        "Architecture has allowed me to cultivate a wide range of skills, from client and community collaboration, technical detailing, code, complex problem solving and 3D modeling/visualization. My experience ranges from working with the largest companies in the world, to small scale community sized initiatives.",
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
