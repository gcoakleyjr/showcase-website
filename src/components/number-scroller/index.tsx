import { useEffect } from "react";
import styles from "./number-scroller.module.css";
import { useAnimate } from "framer-motion";

type Props = {
  current: number;
};

export function NumberScroller({ current }: Props) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { y: current * 20 - 81 }, { duration: 0.55 });
  }, [current]);

  return (
    <div className={styles.numberScroller}>
      <div ref={scope} className={styles.numberWheel}>
        <span className={styles.number}>7</span>
        <span className={styles.number}>6</span>
        <span className={styles.number}>5</span>
        <span className={styles.number}>4</span>
        <span className={styles.number}>3</span>
        <span className={styles.number}>2</span>
        <span className={styles.number}>1</span>
      </div>
      <div style={{ margin: "0 8px" }}>—</div>
      <div>7</div>
    </div>
  );
}
