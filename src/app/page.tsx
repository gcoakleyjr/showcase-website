"use client";
import { NavBar } from "@/components/narbar";
import { TrackImage } from "@/components/track-image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
import { getImages, imageProps } from "@/utilities/util";
import { ImageOverlay } from "@/components/image-overlay";
import { Thumbnails } from "@/components/thumbnail";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const imagesArray = getImages();

  const imagesRef = useRef(new Array());
  const trackRef = useRef(null);
  const pageRef = useRef(null);
  const [trackSizeRef, trackBounds] = useMeasure({ debounce: 100 });
  const [imageSizeRef, imageBounds] = useMeasure({ debounce: 100 });

  const imageSizePercent = imageBounds.width
    ? (imageBounds.width / trackBounds.width) * 100
    : 13.04;

  const TRACK_MIN_OFFSET = imageSizePercent / 2;
  const TRACK_MAX_OFFSET = 100 - imageSizePercent / 2;
  const DIVISION_WIDTH = trackBounds.width ? trackBounds.width / 7 : 1;

  const [prevSelected, setPrevSelected] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<imageProps | null>(null);
  const [layoutState, setLayoutState] = useState<any>();
  const [animating, setAnimating] = useState(false);

  const { percentage, scrollPosition } = useCarouselMotion(
    trackBounds.width,
    TRACK_MIN_OFFSET,
    TRACK_MAX_OFFSET,
    selected !== null
  );

  const isDragging = useRef(false);

  const CURRENT_IMAGE =
    selected !== null
      ? selected + 1
      : animating
      ? prevSelected + 1
      : Math.max(Math.ceil(scrollPosition / DIVISION_WIDTH), 1);

  const page = gsap.utils.selector(pageRef);
  const ctx = useRef<any>(null);

  useLayoutEffect(() => {
    if (!layoutState) return;

    const flip = Flip.from(layoutState, {
      duration: 1,
      targets: page(".c-image"),
      ease: "power4.out",
      stagger: {
        each: 0.03,
        ease: "power4.inOut",
      },
      onStart: () => setAnimating(true),
      onComplete: () => setAnimating(false),
      absolute: true,
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

  function handleSelectionClick(e: MouseEvent, i: number, image: imageProps) {
    if (e.button === 2) return;
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
    setPrevSelected(i);
    setSelected(i);
    setLayoutState(Flip.getState(page(".c-image")));
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
      <NavBar current="Work" />
      {!selected && (
        <div className={styles.crossContainer}>
          <CrossIcon />
        </div>
      )}

      <div
        ref={mergeRefs([trackSizeRef, trackRef])}
        className={styles.imagesContainer}
      >
        {selected === null &&
          imagesArray.map((val, i) => {
            return (
              <TrackImage
                image={val.images}
                key={i}
                ref={imagesRef}
                sizeRef={imageSizeRef}
                onMouseDown={(e: any) => handleSelectionClick(e, i, val)}
                onMouseUp={() => (isDragging.current = false)}
                index={i}
                prevSelected={prevSelected === i}
              />
            );
          })}
      </div>

      {selected !== null && (
        <div
          key="selected"
          className={`${styles.selectedImage} c-image`}
          data-flip-id={`img-${selected}`}
        >
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            {imagesArray.map((image, i) => {
              return (
                <img
                  src={image.images}
                  key={image.images}
                  alt=""
                  style={{
                    objectFit: "cover",
                    width: selected === i ? "100%" : 0,
                    height: "100%",
                    transition:
                      "width 1.3s cubic-bezier(0.11, 0.46, 0.46, 0.92)",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {selected !== null && (
        <Thumbnails
          imagesArray={imagesArray}
          selected={selected}
          setSelected={setSelected}
          setSelectedSource={setSelectedSource}
        />
      )}

      {imagesArray.map((image, i) => {
        return (
          <div key={i}>
            {selected === null && (
              <div
                className={`${styles.hiddenThumbnail} c-image`}
                data-flip-id={`img-thumb`}
              >
                <img
                  src={image.images}
                  alt=""
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <ImageOverlay
        selected={selected}
        setSelected={setSelected}
        setLayoutState={setLayoutState}
        page={page}
        selectedSource={selectedSource}
      />

      <NumberScroller current={CURRENT_IMAGE} selected={selected !== null} />
    </motion.main>
  );
}
