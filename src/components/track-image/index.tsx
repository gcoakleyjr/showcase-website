import Image from "next/image";
import styles from "./track-image.module.css";
import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { mergeRefs } from "react-merge-refs";
import { debounce } from "lodash";

type Props = {
  image: string;
  sizeRef: any;
  layoutId: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
  selected: boolean;
  cardRef: any;
  prevSelected: boolean;
};

export const TrackImage = forwardRef(function TrackImage(
  {
    image,
    sizeRef,
    layoutId,
    onMouseDown,
    onMouseUp,
    selected,
    cardRef,
    prevSelected,
  }: Props,
  ref: any
) {
  const [cardOpen, setCardOpen] = useState(false);

  const debouceCardClose = debounce(() => {
    setCardOpen(false);
  }, 2700);

  useEffect(() => {
    if (!!selected) {
      setCardOpen(true);
    } else {
      if (prevSelected) {
        debouceCardClose();
      }
    }
  }, [selected]);

  function addToRefsArray(el: any) {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  }

  function addToCardRefsArray(el: any) {
    if (el && !cardRef.current.includes(el)) {
      cardRef.current.push(el);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${cardOpen ? styles.cardOpen : ""}`}>
        <div ref={addToCardRefsArray}>
          <motion.div
            ref={sizeRef}
            id={layoutId}
            className={styles.imageWrapper}
            // layoutId={layoutId}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            // animate={
            //   selected
            //     ? { width: "100vw", height: "100vh" }
            //     : { width: "36vmin", height: "51vmin" }
            // }
            // layout="preserve-aspect"
            style={{ originX: "0%", originY: "0%" }}
            transition={{
              duration: 0.7,
              ease: [0.23, 0.32, 0.53, 0.99],
              type: "tween",
            }}
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
        </div>
      </div>
    </div>
  );
});
