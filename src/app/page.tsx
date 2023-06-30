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
import { getImages, imageProps, preloadImages } from "@/utilities/util";
import { ImageOverlay } from "@/components/image-overlay";
import Image from "next/image";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const imageLinks = getImages();

  const imagesArray = preloadImages(imageLinks);

  const imagesRef = useRef(new Array());
  const trackRef = useRef(null);
  const pageRef = useRef(null);
  const [trackSizeRef, trackBounds] = useMeasure({ debounce: 100 });
  const [imageSizeRef, imageBounds] = useMeasure({ debounce: 100 });

  const imageSizePercent = imageBounds.width
    ? (imageBounds.width / trackBounds.width) * 100
    : 11.4;

  const TRACK_MIN_OFFSET = imageSizePercent / 2;
  const TRACK_MAX_OFFSET = 100 - imageSizePercent / 2;
  const DIVISION_WIDTH = trackBounds.width ? trackBounds.width / 8 : 1;

  const { percentage, scrollPosition } = useCarouselMotion(
    trackBounds.width,
    TRACK_MIN_OFFSET,
    TRACK_MAX_OFFSET
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<imageProps | null>(null);
  const [innerProjectSelected, setInnerProjectSelected] = useState(0);
  const [layoutState, setLayoutState] = useState<any>();
  const [animating, setAnimating] = useState(false);

  const isDragging = useRef(false);

  const CURRENT_IMAGE = Math.max(Math.ceil(scrollPosition / DIVISION_WIDTH), 1);

  const page = gsap.utils.selector(pageRef);
  const ctx = useRef<any>(null);

  useLayoutEffect(() => {
    if (!layoutState) return;

    const flip = Flip.from(layoutState, {
      duration: 1.2,
      targets: page(".c-image"),
      ease: "power4.out",
      onStart: () => setAnimating(true),
      onComplete: () => setAnimating(false),
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
    setInnerProjectSelected(0);
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
            zIndex: 90,
          }}
          className="c-image"
          data-flip-id={`img-${selected}`}
        >
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            {selectedSource?.images.map((image, i) => {
              return (
                <div
                  key={image}
                  style={{
                    width: innerProjectSelected === i ? "100%" : 0,
                    transition:
                      "width 1.3s cubic-bezier(0.11, 0.46, 0.46, 0.92)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image}
                    fill
                    quality={100}
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ImageOverlay
        selected={selected}
        setSelected={setSelected}
        setInnerProjectSelected={setInnerProjectSelected}
        setLayoutState={setLayoutState}
        page={page}
        selectedSource={selectedSource}
        animating={animating}
        innerProjectSelected={innerProjectSelected}
      />

      <NumberScroller current={CURRENT_IMAGE} />
    </motion.main>
  );
}
