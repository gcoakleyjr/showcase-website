import { Variants } from "framer-motion";

export type imageProps = {
  title: string;
  images: string[];
};

export function getImages(): imageProps[] {
  const library: imageProps[] = [
    {
      title: "1 St Clair Ave",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262240/img_1_gyroxk.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262240/img_2_bijrqo.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262240/img_3_ti5wjl.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262240/img_4_t5e0tj.jpg",
      ],
    },
    {
      title: "The Office",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262294/img_1_oydmq8.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262292/img_2_kh3oc2.jpg",
      ],
    },
    {
      title: "The Residential Tower",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262303/img_1_njgifa.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262303/img_3_p6f8gb.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262303/img_2_y3cuii.jpg",
      ],
    },
    {
      title: "The Swirl Office",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262312/img_1_cdyyyc.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262311/img_2_egtoq9.jpg",
      ],
    },
    {
      title: "The Hotel",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262316/img_1_zvcu4p.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262316/img_2_okjfvn.jpg",
      ],
    },
    {
      title: "W52 Waterfront",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262322/img_1_pye5by.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262322/img_2_r1sscm.jpg",
      ],
    },
    {
      title: "Hotel Hub",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262326/img_1_cdy8je.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262326/img_2_e0vjse.jpg",
      ],
    },
    {
      title: "The Extras",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262331/img_2_xhfns1.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262331/img_1_z8bntp.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686262331/img_3_se9dl7.jpg",
      ],
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: "easeOuit",
    },
  },
};

export const IMAGE_SELECTOR_ITEM_MOTION: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
