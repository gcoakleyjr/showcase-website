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
import styles from "./image-overlay.module.css";

gsap.registerPlugin(Flip);

type Props = {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  setLayoutState: any;
  page: gsap.utils.SelectorFunc;
  selectedSource: imageProps | null;
};

export function ImageOverlay({
  selected,
  setSelected,
  setLayoutState,
  page,
  selectedSource,
}: Props) {
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
            }}
            onClick={() => {
              setSelected(null);
              setLayoutState(Flip.getState(page(".c-image")));
            }}
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
      )}
    </AnimatePresence>
  );
}
