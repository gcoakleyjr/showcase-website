"use client";
import { NavBar } from "@/components/narbar";
import { TrackImage } from "@/components/track-image";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
  useDragControls,
  PanInfo,
} from "framer-motion";
import useMeasure from "react-use-measure";
import styles from "./page.module.css";
import { CrossIcon } from "@/components/cross";
import debounce from "lodash/debounce";
import { mergeRefs } from "react-merge-refs";
import { NumberScroller } from "@/components/number-scroller";
import Image from "next/image";

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef(new Array());
  const [trackSizeRef, trackBounds] = useMeasure({ debounce: 100 });
  const [imageSizeRef, imageBounds] = useMeasure({ debounce: 100 });
  const imageSizePercent = imageBounds.width
    ? (imageBounds.width / trackBounds.width) * 100
    : 11.4;

  const TRACK_MIN_OFFSET = imageSizePercent / 2;
  const TRACK_MAX_OFFSET = 100 - imageSizePercent / 2;
  const DIVISION_WIDTH = trackBounds.width ? trackBounds.width / 8 : 1;

  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(TRACK_MIN_OFFSET);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [selected, setSelected] = useState<number | null>(null);
  const isDragging = useRef(false);

  function handleSelectionClick(i: number) {
    isDragging.current = true;
    handleSelection(i);
  }

  const handleSelection = debounce((i) => {
    if (isDragging.current) return;
    setSelected(i);
  }, 200);

  useEffect(() => {
    return () => {
      handleSelection.cancel();
    };
  }, []);

  const CURRENT_IMAGE = Math.max(Math.ceil(scrollPosition / DIVISION_WIDTH), 1);

  //Mouse Wheel Event functions
  const debouncedEnd = useMemo(() => {
    return debounce((value) => handleWheelEnd(value), 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedEnd.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleWheelEnd(value: number) {
    setPrevPercentage(value);
  }

  function handleWheelScroll(event: any) {
    const scrollDelta = event.deltaY * 1.4;
    const newScrollPosition = scrollPosition + scrollDelta;

    // Ensure the newScrollPositionX remains within the box limits
    const clampedScrollPosition = Math.max(
      0,
      Math.min(newScrollPosition, trackBounds.width)
    );

    setScrollPosition(clampedScrollPosition);
    const scrollPercentage = (scrollPosition / trackBounds.width) * 100;

    const nextPercentage = Math.max(
      Math.min(scrollPercentage, TRACK_MAX_OFFSET),
      TRACK_MIN_OFFSET
    );

    setPercentage(nextPercentage);
    debouncedEnd(nextPercentage);
  }

  //Mouse Click Event Handlers
  function handleMouseDown(e: any) {
    setMouseDownAt(e.clientX);
  }

  function handleMouseUp() {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  }

  function handleOnMove(e: any) {
    if (mouseDownAt === 0) {
      return;
    }
    const delta = mouseDownAt - e.clientX;
    const maxDelta = windowWidth / 1.5;

    const percentageRaw = (delta / maxDelta) * 100;
    const nextPercentageRaw = prevPercentage + percentageRaw;
    const nextPercentage = Math.max(
      Math.min(nextPercentageRaw, TRACK_MAX_OFFSET),
      TRACK_MIN_OFFSET
    );
    setScrollPosition((trackBounds.width * nextPercentage) / 100);

    setPercentage(nextPercentage);
  }

  //Animates the Images
  trackRef.current?.animate(
    {
      transform: `translate(-${percentage}%, -50%)`,
    },
    { duration: 1500, fill: "forwards", easing: "cubic-bezier(.26,.1,.63,.94)" }
  );

  for (let i = 0; i < imagesRef.current.length; i++) {
    imagesRef.current[i].animate(
      {
        objectPosition: `${100 + -percentage}% center`,
      },
      {
        duration: 1500,
        fill: "forwards",
        easing: "cubic-bezier(.26,.1,.63,.94)",
      }
    );
  }

  //Event handlers ran once
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  //Event handler constant update
  useEffect(() => {
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheelScroll);
    return () => {
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheelScroll);
    };
  });

  return (
    <motion.main className={styles.main} whileTap={{ cursor: "grabbing" }}>
      <NavBar />
      <div className={styles.crossContainer}>
        <CrossIcon />
      </div>
      <div
        ref={mergeRefs([trackRef, trackSizeRef])}
        className={styles.imagesContainer}
      >
        {Array(8)
          .fill("")
          .map((val, i) => {
            return (
              <TrackImage
                image={`/images/p${i + 1}/img_1.jpg`}
                key={i}
                ref={imagesRef}
                sizeRef={imageSizeRef}
                layoutId={`image${i}`}
                onMouseDown={() => handleSelectionClick(i)}
                onMouseUp={() => (isDragging.current = false)}
              />
            );
          })}
      </div>

      {selected && (
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
      )}

      <NumberScroller current={CURRENT_IMAGE} />
    </motion.main>
  );
}
