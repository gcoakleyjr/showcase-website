import {
  AnimatePresence,
  PanInfo,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { imageProps } from "@/utilities/util";
import { Dispatch, SetStateAction, useState } from "react";
import { Flip } from "gsap/Flip";
import { gsap } from "gsap";
import styles from "./image-overlay.module.css";

gsap.registerPlugin(Flip);

type Props = {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  setLayoutState: any;
  page: gsap.utils.SelectorFunc;
  selectedSource: imageProps | null;
  isTouchDevice: boolean;
  setSelectedSource: Dispatch<SetStateAction<imageProps | null>>;
  imagesArray: imageProps[];
};

export function ImageOverlay({
  selected,
  setSelected,
  setLayoutState,
  page,
  selectedSource,
  isTouchDevice,
  setSelectedSource,
  imagesArray,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const closeOpacity = useTransform(y, [0, 100], [0, 1]);

  function handleDragEnd(event: any, info: PanInfo) {
    if (info.offset.y > 100) {
      handleClose();
    } else if (info.offset.x < -100) {
      const newIndex =
        selected !== null && selected < 6 ? selected + 1 : selected;
      setSelected(newIndex);
      setSelectedSource(newIndex !== null ? imagesArray[newIndex] : null);
    } else if (info.offset.x > 100) {
      const newIndex =
        selected !== null && selected > 0 ? selected - 1 : selected;
      setSelected(newIndex);
      setSelectedSource(newIndex !== null ? imagesArray[newIndex] : null);
    } else return;
  }

  function handleClose() {
    setSelected(null);
    setLayoutState(Flip.getState(page(".c-image")));
  }

  return (
    <AnimatePresence>
      {selected !== null && (
        <motion.div
          key={`item-${selected}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlayWrapper}
        >
          <motion.div
            className={styles.innerContainer}
            drag={isTouchDevice}
            dragDirectionLock
            dragConstraints={{
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            dragElastic={{ top: 0, bottom: 0.1, left: 0.1, right: 0.1 }}
            onDragEnd={handleDragEnd}
            style={{ x, y, opacity }}
          >
            <motion.span
              style={{
                position: "absolute",
                top: "-25px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                opacity: closeOpacity,
              }}
            >
              close
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: `0.25em` }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 1,
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                padding: "8px 14px 8px 0",
                cursor: "pointer",
                pointerEvents: "auto",
                position: "relative",
                zIndex: 110,
                marginBottom: "20px",
                color: "#e7e7e7b7",
              }}
              onClick={handleClose}
            >
              Back
            </motion.span>

            <div className={styles.titleContainer}>
              <div className={styles.titleWrapper}>
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
                  className={styles.title}
                >
                  {selectedSource?.title}
                </motion.h1>
              </div>
              {(selectedSource?.siteLink || selectedSource?.gitLink) && (
                <motion.span
                  initial={{ opacity: 0, y: `0.25em` }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.2, 0.65, 0.3, 0.9],
                      delay: 0.9,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  style={{ pointerEvents: "auto" }}
                >
                  visit<br></br>
                  {selectedSource.gitLink && (
                    <a href={selectedSource.gitLink} target="_blank">
                      github{selectedSource.siteLink && ", "}
                    </a>
                  )}
                  {selectedSource.siteLink && (
                    <a href={selectedSource.siteLink} target="_blank">
                      website
                    </a>
                  )}
                </motion.span>
              )}
            </div>

            <motion.p
              className={styles.paragraph}
              initial={{ opacity: 0, y: `0.25em` }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.7,
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {selectedSource?.description}
            </motion.p>

            {selectedSource?.tech && (
              <motion.span
                initial={{ opacity: 0, y: `0.25em` }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.2, 0.65, 0.3, 0.9],
                    delay: 0.8,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                made with <br></br>
                {selectedSource?.tech?.map((item, i, a) => {
                  return (
                    <span key={item}>
                      {item}
                      {i === a.length - 1 ? "." : ","}{" "}
                    </span>
                  );
                })}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
