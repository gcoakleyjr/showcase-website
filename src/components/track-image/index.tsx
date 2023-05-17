import Image from "next/image";
import styles from "./track-image.module.css";
import { forwardRef } from "react";
import { motion } from "framer-motion";

type Props = {
  image: string;
  sizeRef: any;
  layoutId: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
};

export const TrackImage = forwardRef(function TrackImage(
  { image, sizeRef, layoutId, onMouseDown, onMouseUp }: Props,
  ref: any
) {
  function addToRefsArray(el: any) {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  }
  return (
    <motion.div
      ref={sizeRef}
      className={styles.imageWrapper}
      layoutId={layoutId}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      transition={{ duration: 0.6, ease: [0.11, 0.46, 0.46, 0.92] }}
    >
      <Image
        alt=""
        ref={addToRefsArray}
        src={image}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "94.44% center",
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority
        draggable={false}
      />
    </motion.div>
  );
});
