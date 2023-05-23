"use client";
import { NavBar } from "@/components/narbar";
import { TrackImage } from "@/components/track-image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import styles from "./page.module.css";
import { CrossIcon } from "@/components/cross";
import debounce from "lodash/debounce";
import { NumberScroller } from "@/components/number-scroller";
import { useCarouselMotion } from "@/utilities/carousel-motion";

export default function Home() {
  const cardRef = useRef(new Array());
  const imagesRef = useRef(new Array());
  const [trackSizeRef, trackBounds] = useMeasure({ debounce: 100 });
  const [imageSizeRef, imageBounds] = useMeasure({ debounce: 100 });
  const imageSizePercent = imageBounds.width
    ? (imageBounds.width / trackBounds.width) * 100
    : 11.4;

  const TRACK_MIN_OFFSET = imageSizePercent / 2;
  const TRACK_MAX_OFFSET = 100 - imageSizePercent / 2;
  const DIVISION_WIDTH = trackBounds.width ? trackBounds.width / 8 : 1;
  const CAROUSEL_ANIMATION_TIME = 1500;

  const { percentage, scrollPosition } = useCarouselMotion(
    trackBounds.width,
    TRACK_MIN_OFFSET,
    TRACK_MAX_OFFSET
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [prevSelected, setPrevSelected] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState([0, 0]);
  const isDragging = useRef(false);

  const CURRENT_IMAGE = Math.max(Math.ceil(scrollPosition / DIVISION_WIDTH), 1);
  const CAROUSEL_DRAGX = `translateX(${
    percentage * -1 * (100 / imageSizePercent)
  }%)`;
  const CAROUSEL_SELECTEDX = `translate(${selectedOrigin[0]}px, ${selectedOrigin[1]}px)`;

  function handleSelectionClick(i: number) {
    //get newX translate for image position after click
    const imgRect = document
      .getElementById(`image${i}`)
      ?.getBoundingClientRect();
    const newX = (imgRect?.left || 0) + window.scrollX;
    const newY = (imgRect?.top || 0) + window.scrollY;

    if (i === selected) {
      setPrevSelected(i);
      setIsClosing(true);
      debouncedIsClosing();
      setSelected(null);
      return;
    }
    isDragging.current = true;
    setIsOpening(true);
    setSelectedOrigin([newX, newY]);
    handleSelection(i);
  }

  const handleSelection = debounce((i) => {
    if (isDragging.current) return;
    setSelected(i);
  }, 200);

  const debouncedIsClosing = debounce(() => {
    setIsClosing(false);
    setPrevSelected(null);
  }, 2700);

  const debouncedIsOpening = debounce(() => {
    setIsClosing(false);
  }, 1);

  useEffect(() => {
    return () => {
      handleSelection.cancel();
      debouncedIsClosing.cancel();
      debouncedIsOpening.cancel();
    };
  }, []);

  //
  //
  //Animates the Images

  for (let i = 0; i < imagesRef.current.length; i++) {
    if (selected === i) {
      cardRef.current[i].animate(
        {
          transform: [CAROUSEL_SELECTEDX, "translate(0, 0)"],
        },
        {
          duration: 700,
          fill: "forwards",
          easing: "cubic-bezier(.23, .32, .53, .99)",
          origin: "0% 0%",
        }
      );
    } else if (prevSelected === i) {
      cardRef.current[i].animate(
        {
          transform: ["translate(0, 0)", CAROUSEL_SELECTEDX],
        },
        {
          duration: 2700,
          fill: "forwards",
          easing: "cubic-bezier(.23, .32, .53, .99)",
          origin: "0% 0%",
        }
      );
    } else {
      cardRef.current[i].animate(
        {
          transform: CAROUSEL_DRAGX,
        },
        {
          duration: CAROUSEL_ANIMATION_TIME,
          fill: "forwards",
          easing: "cubic-bezier(.26,.1,.63,.94)",
          origin: "0 0",
        }
      );
    }
  }

  for (let i = 0; i < imagesRef.current.length; i++) {
    imagesRef.current[i].animate(
      {
        objectPosition:
          selected === i
            ? [`${100 + -percentage}% 50%`, "50% 50%"]
            : `${100 + -percentage}% center`,
      },
      {
        duration: CAROUSEL_ANIMATION_TIME,
        fill: "forwards",
        easing: "cubic-bezier(.26,.1,.63,.94)",
        origin: "0 0",
      }
    );
  }

  return (
    <motion.main className={styles.main} whileTap={{ cursor: "grabbing" }}>
      {/* <NavBar /> */}
      <div className={styles.crossContainer}>
        <CrossIcon />
      </div>
      <div ref={trackSizeRef} className={styles.imagesContainer}>
        {Array(8)
          .fill("")
          .map((val, i) => {
            return (
              <TrackImage
                image={`/images/p${i + 1}/img_1.jpg`}
                key={i}
                ref={imagesRef}
                sizeRef={imageSizeRef}
                cardRef={cardRef}
                layoutId={`image${i}`}
                onMouseDown={() => handleSelectionClick(i)}
                onMouseUp={() => (isDragging.current = false)}
                selected={selected === i}
                prevSelected={prevSelected === i}
              />
            );
          })}
      </div>

      {/* {selected && (
        <motion.img
          src={`/images/p${selected + 1}/img_1.jpg`}
          alt=""
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 1000,
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
          }}
          layoutId={`image${selected}`}
          onClick={() => setSelected(null)}
          transition={{ duration: 0.6, ease: [0.11, 0.46, 0.46, 0.92] }}
        />
      )} */}

      <NumberScroller current={CURRENT_IMAGE} />
    </motion.main>
  );
}
