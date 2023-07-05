import { imageProps } from "@/utilities/util";
import { Dispatch, SetStateAction } from "react";
import styles from "./thumbnail.module.css";

type Props = {
  imagesArray: imageProps[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number | null>>;
  setSelectedSource: Dispatch<SetStateAction<imageProps | null>>;
};

export function Thumbnails({
  imagesArray,
  selected,
  setSelected,
  setSelectedSource,
}: Props) {
  return (
    <div className={styles.thumbnailWrapper}>
      {imagesArray.map((image, i) => {
        return (
          <div className={styles.thumbnailDiv} key={i}>
            {selected !== i ? (
              <div
                className={`${styles.thumbnail}  c-image`}
                data-flip-id={`img-${i}`}
                onClick={() => {
                  setSelected(i);
                  setSelectedSource(image);
                }}
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
            ) : (
              <div
                className={`${styles.thumbnail}  c-image`}
                data-flip-id={`img-thumb`}
                onClick={() => {
                  setSelected(i);
                  setSelectedSource(image);
                }}
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
    </div>
  );
}
