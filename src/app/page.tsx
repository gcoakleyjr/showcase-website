"use client";
import { NavBar } from "@/components/narbar";
import { TrackImage } from "@/components/track-image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import styles from "./page.module.css";
import { CrossIcon } from "@/components/cross";
import debounce from "lodash/debounce";
import { NumberScroller } from "@/components/number-scroller";
import { useCarouselMotion } from "@/utilities/carousel-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { mergeRefs } from "react-merge-refs";
import {
  IMAGE_SELECTOR_ITEM_MOTION,
  IMAGE_SELECTOR_MOTION,
  getImages,
  imageProps,
} from "@/utilities/util";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const imagesRef = useRef(new Array());
  const trackRef = useRef(null);
  const pageRef = useRef(null);

  const imagesArray = getImages();

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
  const [selectedSource, setSelectedSource] = useState<imageProps | null>(null);
  const [layoutState, setLayoutState] = useState<any>();

  const isDragging = useRef(false);

  const CURRENT_IMAGE = Math.max(Math.ceil(scrollPosition / DIVISION_WIDTH), 1);
  const CAROUSEL_DRAGX = `translateX(${
    percentage * -1 * (100 / imageSizePercent)
  }%)`;

  const page = gsap.utils.selector(pageRef);
  const ctx = useRef<any>(null);

  useLayoutEffect(() => {
    if (!layoutState) return;

    const flip = Flip.from(layoutState, {
      duration: 1.2,
      targets: page(".c-image"),
      ease: "power4.out",
    });

    return () => {
      flip.kill();
    };
  }, [layoutState]);

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => ctx.current.revert();
  }, [ctx]);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(trackRef.current, {
        xPercent: `-${percentage}`,
        ease: "power4.out",
        duration: 1.5,
        overwrite: true,
      });
    });

    ctx.current.add(() => {
      gsap.to(imagesRef.current, {
        objectPosition: `${100 + -percentage}% center`,
        ease: "power4.out",
        duration: 1.5,
        overwrite: true,
      });
    });
  }, [percentage]);

  function handleSelectionClick(i: number, image: imageProps) {
    if (i === selected) {
      setSelected(null);
      return;
    }
    isDragging.current = true;
    setSelectedSource(image);
    handleSelection(i);
  }

  const handleSelection = debounce((i) => {
    if (isDragging.current) return;
    setLayoutState(Flip.getState(page(".c-image")));

    setSelected(i);
  }, 200);

  useEffect(() => {
    return () => {
      handleSelection.cancel();
    };
  }, []);

  return (
    <motion.main
      className={`${styles.main} page`}
      ref={pageRef}
      whileTap={{ cursor: "grabbing" }}
    >
      {/* <NavBar /> */}
      <div className={styles.crossContainer}>
        <CrossIcon />
      </div>

      <div
        ref={mergeRefs([trackSizeRef, trackRef])}
        className={styles.imagesContainer}
      >
        {imagesArray.map((val, i) => {
          return (
            <TrackImage
              image={val.images[0]}
              key={i}
              ref={imagesRef}
              sizeRef={imageSizeRef}
              onMouseDown={() => handleSelectionClick(i, val)}
              onMouseUp={() => (isDragging.current = false)}
              selected={selected === i}
              index={i}
            />
          );
        })}
      </div>

      {selected && (
        <div
          key="selected"
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            overflow: "hidden",
          }}
          className="c-image"
          data-flip-id={`img-${selected}`}
        >
          <img
            src={selectedSource?.images[0]}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onClick={() => {
              setSelected(null);
              setLayoutState(Flip.getState(page(".c-image")));
            }}
          />
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "75%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CrossIcon />
              <div style={{ height: "80px", overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: 85 }}
                  animate={{ y: 0 }}
                  exit={{ y: -85 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  style={{ fontWeight: 400, fontSize: "70px" }}
                >
                  {selectedSource?.title}
                </motion.h1>
              </div>

              <CrossIcon />
            </div>
            <motion.div
              variants={IMAGE_SELECTOR_MOTION}
              initial="initial"
              animate="animate"
              exit="exit"
              key="nested-images"
              style={{
                position: "absolute",

                display: "flex",
                height: "100px",
                right: "45px",
                bottom: "45px",
                gap: "8px",
              }}
            >
              {selectedSource?.images.map((image, i) => {
                return (
                  <motion.img
                    key={i}
                    src={image}
                    alt=""
                    variants={IMAGE_SELECTOR_ITEM_MOTION}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      type: "tween",
                    }}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <NumberScroller current={CURRENT_IMAGE} />
    </motion.main>
  );
}
