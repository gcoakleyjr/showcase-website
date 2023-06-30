import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

export type imageProps = {
  title: string;
  images: string[];
};

export function getImages(): imageProps[] {
  const library: imageProps[] = [
    {
      title: "1 St Clair Ave",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624504/img_1_d8xdk6.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624505/img_2_xzg3gx.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624505/img_4_cxsucy.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624505/img_3_endl4b.jpg",
      ],
    },
    {
      title: "The Office",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624510/img_1_vpkxqm.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624510/img_2_r06fyy.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624510/img_3_g0iqrv.jpg",
      ],
    },
    {
      title: "The Residential Tower",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624516/img_1_wwkwit.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624516/img_2_tveeso.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624516/img_3_s6qq64.jpg",
      ],
    },
    {
      title: "The Swirl Office",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624525/img_1_kkcvtj.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624525/img_3_tzyaj2.jpg",
      ],
    },
    {
      title: "The Hotel",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624533/img_1_ssrlgg.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624533/img_2_o8ovzr.jpg",
      ],
    },
    {
      title: "W52 Waterfront",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624543/img_1s_g44wp0.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624543/img_2_s_vz8gei.jpg",
      ],
    },
    {
      title: "Hotel Hub",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624547/img_1_u2vgtb.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624547/img_2_jgf69v.jpg",
      ],
    },
    {
      title: "The Extras",
      images: [
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624552/img_2_numj70.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624552/img_1_ypnya0.jpg",
        "https://res.cloudinary.com/dx1cp4cj9/image/upload/v1686624551/img_3_t6vqlf.jpg",
      ],
    },
  ];

  return library;
}

export function preloadImages(library: imageProps[]): imageProps[] {
  const [preloadedLibrary, setPreloadedLibrary] = useState<imageProps[]>([]);

  useEffect(() => {
    const preloadImages = async () => {
      const preloadedLibraryItems: imageProps[] = await Promise.all(
        library.map(async (item) => {
          const images = await Promise.all(
            item.images.map(
              (imageUrl) =>
                new Promise<string>((resolve) => {
                  const img = new Image();
                  img.src = imageUrl;
                  img.onload = () => resolve(img.src);
                })
            )
          );

          return {
            title: item.title,
            images,
          };
        })
      );

      setPreloadedLibrary(preloadedLibraryItems);
    };

    preloadImages();
  }, []);

  return preloadedLibrary;
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
