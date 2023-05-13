"use client";
import { NavBar } from "@/components/narbar";
import { TrackImage } from "@/components/track-image";
import { MouseEvent, useEffect, useRef, useState } from "react";
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

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef(new Array());

  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(-5.66);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);

  const [ref, bounds] = useMeasure({ debounce: 300 });

  function handleWheelScroll(e: any) {
    const { deltaY } = e;
    setScrollAmount(Math.max(Math.min(scrollAmount + deltaY, 0), -895));
    const nextPercentageRaw = (scrollAmount + percentage) / 25;
    const nextPercentage = Math.max(Math.min(nextPercentageRaw, -5.66), -94.25);
    setPercentage(nextPercentage);
    console.log("delta", deltaY, "scrollA", scrollAmount);
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

    const percentageRaw = (delta / maxDelta) * -100;
    const nextPercentageRaw = prevPercentage + percentageRaw;
    const nextPercentage = Math.max(Math.min(nextPercentageRaw, -5.66), -94.25);
    setPercentage(nextPercentage);
  }

  trackRef.current?.animate(
    {
      transform: `translate(${percentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards", easing: "ease-in" }
  );

  for (let i = 0; i < imagesRef.current.length; i++) {
    imagesRef.current[i].animate(
      {
        objectPosition: `${100 + percentage}% center`,
      },
      { duration: 1200, fill: "forwards", easing: "ease-in" }
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
      <div ref={trackRef} className={styles.imagesContainer}>
        {Array(8)
          .fill("")
          .map((val, i) => {
            return (
              <TrackImage
                image={`/images/p${i + 1}/img_1.jpg`}
                key={i}
                ref={imagesRef}
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
