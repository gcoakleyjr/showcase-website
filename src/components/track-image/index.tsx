import Image from "next/image";
import styles from "./track-image.module.css";
import { forwardRef } from "react";

type Props = {
  image: string;
  sizeRef: any;
};

export const TrackImage = forwardRef(function TrackImage(
  { image, sizeRef }: Props,
  ref: any
) {
  function addToRefsArray(el: any) {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  }
  return (
    <div ref={sizeRef} className={styles.imageWrapper}>
      <Image
        alt=""
        ref={addToRefsArray}
        src={image}
        fill
        style={{ objectFit: "cover", objectPosition: "94.44% center" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority
        draggable={false}
      />
    </div>
  );
});
