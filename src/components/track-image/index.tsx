import styles from "./track-image.module.css";
import { MouseEventHandler, forwardRef } from "react";

type Props = {
  image: string;
  sizeRef: any;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onMouseUp: () => void;
  index: number;
  prevSelected: boolean;
  opacity: number;
};

export const TrackImage = forwardRef(function TrackImage(
  {
    image,
    sizeRef,
    onMouseDown,
    onMouseUp,
    index,
    prevSelected,
    opacity,
  }: Props,
  ref: any
) {
  function addToRefsArray(el: any) {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={sizeRef}
        className={`${styles.imageWrapper} c-image loading-ani`}
        style={{ zIndex: prevSelected ? 10 : 20, opacity }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        data-flip-id={`img-${index}`}
      >
        <img
          alt=""
          fetchPriority="high"
          ref={addToRefsArray}
          src={image}
          style={{
            objectFit: "cover",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
});
