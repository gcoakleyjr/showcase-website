import { motion } from "framer-motion";

export function CrossIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      style={{
        width: 22,
        height: 22,
        fill: "white",
      }}
    >
      <svg viewBox="0 0 22 22">
        <polygon points="22 11.751 0 11.751 0 10.249 22 10.249 22 11"></polygon>
        <polygon points="11.751 0 11.751 22 10.249 22 10.249 0 11 0"></polygon>
      </svg>
    </motion.div>
  );
}
