"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function PageTransition(props: any) {
  const pathname = usePathname();
  return (
    <motion.div
      key={`route-${pathname}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {props.children}
    </motion.div>
  );
}
