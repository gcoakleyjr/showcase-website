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
    : 11.4;

  const TRACK_MIN_OFFSET = imageSizePercent / 2;
  const TRACK_MAX_OFFSET = 100 - imageSizePercent / 2;
  const DIVISION_WIDTH = trackBounds.width ? trackBounds.width / 7 : 1;

  const { percentage, scrollPosition } = useCarouselMotion(
    trackBounds.width,
    TRACK_MIN_OFFSET,
    TRACK_MAX_OFFSET
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<imageProps | null>(null);
  const [innerProjectSelected, setInnerProjectSelected] = useState(0);
  const [layoutState, setLayoutState] = useState<any>();
  const [thumbLayoutState, setThumbLayoutState] = useState<any>();
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

  useLayoutEffect(() => {
    if (!thumbLayoutState) return;

    const flip = Flip.from(thumbLayoutState, {
      duration: 1.2,
      targets: page(".d-image"),
      ease: "power4.out",
    });

    return () => {
      flip.kill();
    };
  }, [thumbLayoutState]);

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
    setInnerProjectSelected(0);
    handleSelection(i);
  }

  const handleSelection = debounce((i) => {
    if (isDragging.current) return;

    setLayoutState(Flip.getState(page(".c-image")));
    setThumbLayoutState(Flip.getState(page(".d-image")));
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
        {!selected &&
          imagesArray.map((val, i) => {
            return (
              <TrackImage
                image={val.images}
                key={i}
                ref={imagesRef}
                sizeRef={imageSizeRef}
                onMouseDown={(e: any) => handleSelectionClick(e, i, val)}
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
            top: 0,
            left: 0,
            bottom: 0,
            right: "50%",
            height: "100vh",
            position: "absolute",
            overflow: "hidden",
            zIndex: 90,
          }}
          className="c-image"
          data-flip-id={`img-${selected}`}
        >
          <img
            src={selectedSource?.images}
            key={selectedSource?.images}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}

      {selected && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            height: "50px",
            right: "45px",
            bottom: "45px",
          }}
        >
          {/* <motion.div
              layoutId="image-selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: `${100 * innerProjectSelected}%` }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              style={{
                content: '""',
                position: "absolute",
                border: "1px solid white",
                zIndex: 120,
                width: `${100 / sourceLength}%`,
                top: 0,
                bottom: 0,
              }}
              transition={{
                duration: 1.3,
                ease: [0.11, 0.46, 0.46, 0.92],
                delay: 0.2,
              }}
            /> */}
          {imagesArray.map((image, i) => {
            return (
              <div key={i}>
                {selected !== i && (
                  <div
                    className="d-image"
                    data-flip-id={`img-${i}`}
                    style={{
                      position: "relative",
                      height: "100%",
                      pointerEvents: "auto",
                      zIndex: 110,
                      cursor: "pointer",
                    }}
                  >
                    <img src={image.images} alt="" style={{ height: "100%" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ImageOverlay
        selected={selected}
        setSelected={setSelected}
        setInnerProjectSelected={setInnerProjectSelected}
        setLayoutState={setLayoutState}
        setThumbLayoutState={setThumbLayoutState}
        page={page}
        selectedSource={selectedSource}
        animating={animating}
        innerProjectSelected={innerProjectSelected}
      />

      <NumberScroller current={CURRENT_IMAGE} />
    </motion.main>
  );
}
