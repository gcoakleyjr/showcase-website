import Image from "next/image";
import styles from "./track-image.module.css";
import { forwardRef } from "react";

type Props = {
  image: string;
  sizeRef: any;
  onMouseDown: () => void;
  onMouseUp: () => void;
  selected: boolean;
  index: number;
};

export const TrackImage = forwardRef(function TrackImage(
  { image, sizeRef, onMouseDown, onMouseUp, selected, index }: Props,
  ref: any
) {
  function addToRefsArray(el: any) {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      {!selected && (
        <div
          ref={sizeRef}
          className={`${styles.imageWrapper} c-image`}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          data-flip-id={`img-${index}`}
        >
          <Image
            alt=""
            ref={addToRefsArray}
            src={image}
            style={{
              objectFit: "cover",
            }}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 53vw"
            priority
            draggable={false}
          />
        </div>
      )}
    </div>
  );
});
