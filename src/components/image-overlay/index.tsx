"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CrossIcon } from "../cross";
import {
  IMAGE_SELECTOR_ITEM_MOTION,
  IMAGE_SELECTOR_MOTION,
  imageProps,
} from "@/utilities/util";
import { Dispatch, SetStateAction } from "react";
import { Flip } from "gsap/Flip";
import { gsap } from "gsap";

gsap.registerPlugin(Flip);

type Props = {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  setInnerProjectSelected: (e: any) => void;
  setLayoutState: any;
  setThumbLayoutState: any;
  page: gsap.utils.SelectorFunc;
  selectedSource: imageProps | null;
  animating: boolean;
  innerProjectSelected: number;
};

export function ImageOverlay({
  selected,
  setSelected,
  setInnerProjectSelected,
  innerProjectSelected,
  setLayoutState,
  setThumbLayoutState,
  page,
  selectedSource,
  animating,
}: Props) {
  function handleRightImageChange() {
    if (animating) return;
    if (innerProjectSelected >= Number(selectedSource?.images.length) - 1)
      return;
    setInnerProjectSelected((prev: number) => prev + 1);
  }

  function handleLeftImageChange() {
    if (animating) return;
    if (innerProjectSelected === 0) return;
    setInnerProjectSelected((prev: number) => prev - 1);
  }
  return (
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
          <div style={{ position: "absolute", top: "45px", left: "45px" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                fontSize: "50px",
                padding: "8px 14px",
                cursor: "pointer",
                pointerEvents: "auto",
                position: "relative",
                zIndex: 110,
              }}
              onClick={() => {
                setSelected(null);
                setInnerProjectSelected(0);
                setLayoutState(Flip.getState(page(".c-image")));
                setThumbLayoutState(Flip.getState(page(".d-image")));
              }}
            >
              Back
            </motion.span>
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: "50%",
              pointerEvents: "auto",
            }}
            onClick={handleLeftImageChange}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              right: 0,
              pointerEvents: "auto",
            }}
            onClick={handleRightImageChange}
          />

          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <motion.div
              animate={{ rotateZ: 90 * innerProjectSelected }}
              transition={{ duration: 1.3, ease: [0.11, 0.46, 0.46, 0.92] }}
            >
              <CrossIcon />
            </motion.div>

            <div style={{ height: "80px", overflow: "hidden" }}>
              <motion.h1
                initial={{ y: 85 }}
                animate={{
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
                }}
                exit={{
                  y: -85,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                style={{ fontWeight: 400, fontSize: "70px", opacity: 0.93 }}
              >
                {selectedSource?.title}
              </motion.h1>
            </div>
            <motion.div
              animate={{ rotateZ: 90 * innerProjectSelected }}
              transition={{ duration: 1.3, ease: [0.11, 0.46, 0.46, 0.92] }}
            >
              <CrossIcon />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
