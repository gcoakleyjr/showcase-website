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

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef(new Array());
  const [trackSizeRef, trackBounds] = useMeasure({ debounce: 300 });
  const [imageSizeRef, imageBounds] = useMeasure({ debounce: 300 });
  const imageSizePercent = imageBounds.width
    ? (imageBounds.width / trackBounds.width) * 100
    : 11.4;

  const TRACK_MIN_OFFSET = -(imageSizePercent / 2);
  const TRACK_MAX_OFFSET = imageSizePercent / 2 - 100;

  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(TRACK_MIN_OFFSET);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);

  const isMac =
    typeof window !== "undefined"
      ? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
      : false;
  const isWindows =
    typeof window !== "undefined"
      ? navigator.userAgent.toUpperCase().indexOf("WIN") >= 0
      : false;

  function getDeltaClamp(min?: boolean) {
    if (isMac) {
      return min ? -46 : 46;
    } else if (isWindows) {
      return min ? -20 : 20;
    } else {
      return min ? -40 : 40;
    }
  }

  //Mouse Wheel Event functions
  const debouncedEnd = useMemo(() => {
    return debounce((value) => handleWheelEnd(value), 200);
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
    console.log(value, "wheel");
  }

  function handleWheelScroll(e: any) {
    const { deltaY, deltaX } = e;
    const delta = deltaX + deltaY;
    const clampedDelta = Math.max(
      Math.min(delta, getDeltaClamp()),
      getDeltaClamp(true)
    );
    if (percentage > TRACK_MAX_OFFSET) {
      setScrollAmount(Math.min(scrollAmount + delta, 0));
      console.log(scrollAmount, "limit");
    } else {
      setScrollAmount((prev) => prev);
      console.log(scrollAmount, "free");
    }

    const percentageRaw = (scrollAmount - prevPercentage) / 25;
    // console.log(
    //   percentageRaw,
    //   "raw",
    //   prevPercentage,
    //   "prev",
    //   scrollAmount,
    //   "scroll"
    // );
    const nextPercentage = Math.max(
      Math.min(percentageRaw, TRACK_MIN_OFFSET),
      TRACK_MAX_OFFSET
    );
    console.log(nextPercentage);
    setPercentage(nextPercentage);
    debouncedEnd(percentage);
  }

  //Mouse Click Event Handlers
  function handleMouseDown(e: any) {
    setMouseDownAt(e.clientX);
  }

  function handleMouseUp() {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
    console.log(percentage, "mouse");
  }

  function handleOnMove(e: any) {
    if (mouseDownAt === 0) {
      return;
    }
    const delta = mouseDownAt - e.clientX;
    const maxDelta = windowWidth / 1.5;

    const percentageRaw = (delta / maxDelta) * -100;
    const nextPercentageRaw = prevPercentage + percentageRaw;
    const nextPercentage = Math.max(
      Math.min(nextPercentageRaw, TRACK_MIN_OFFSET),
      TRACK_MAX_OFFSET
    );

    setPercentage(nextPercentage);
  }

  trackRef.current?.animate(
    {
      transform: `translate(${percentage}%, -50%)`,
    },
    { duration: 1500, fill: "forwards", easing: "cubic-bezier(.26,.1,.63,.94)" }
  );

  for (let i = 0; i < imagesRef.current.length; i++) {
    imagesRef.current[i].animate(
      {
        objectPosition: `${100 + percentage}% center`,
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
              />
            );
          })}
      </div>
    </motion.main>
  );
}

// const [ref, bounds] = useMeasure({ debounce: 300 });
// const dragControls = useDragControls();
// const x = useMotionValue(0);
// const halfX = useTransform(x, (value) => value / 2);

// return (
//   <main
//     className={styles.main}
//     onPointerDown={(e) => dragControls.start(e)}
//     style={{ touchAction: "none" }}
//   >
//     <NavBar />
//     <motion.div
//       style={{
//         width: bounds.width,
//         x,
//         pointerEvents: "none",
//       }}
//       drag="x"
//       dragControls={dragControls}
//       dragListener={false}
//       dragConstraints={{
//         right: 0,
//         left: Number(`-${bounds.width * 2}`),
//       }}
//     />
//     <motion.div
//       className={styles.imagesContainer}
//       ref={ref}
//       style={{ x: halfX }}
//     >
//       {Array(8)
//         .fill("")
//         .map((val, i) => {
//           return <TrackImage image={`/images/p${i + 1}/img_1.jpg`} key={i} />;
//         })}
//     </motion.div>
//   </main>
// );
