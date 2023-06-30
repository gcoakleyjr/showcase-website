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
import Image from "next/image";

gsap.registerPlugin(Flip);

type Props = {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  setInnerProjectSelected: (e: any) => void;
  setLayoutState: any;
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
            <CrossIcon />
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
                <div
                  key={i}
                  style={{
                    position: "relative",
                    height: "100%",
                    pointerEvents: "auto",
                    zIndex: 110,
                    cursor: "pointer",
                  }}
                  onClick={() => setInnerProjectSelected(i)}
                >
                  <motion.div
                    variants={IMAGE_SELECTOR_ITEM_MOTION}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      type: "tween",
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={image}
                      alt=""
                      height={100}
                      width={160}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                  </motion.div>

                  {innerProjectSelected === i && (
                    <motion.div
                      layoutId="image-selected"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      style={{
                        content: '""',
                        position: "absolute",
                        border: "1px solid white",
                        top: "-5px",
                        left: "-5px",
                        bottom: "-5px",
                        right: "-5px",
                      }}
                      transition={{
                        duration: 1.3,
                        ease: [0.11, 0.46, 0.46, 0.92],
                        delay: 0.2,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
