"use client";

import { motion } from "motion/react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}: SkeletonProps) => {
  return (
    <motion.div
      className={`bg-gray-200 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
        background: [
          "rgb(229, 231, 235)",
          "rgb(209, 213, 219)",
          "rgb(229, 231, 235)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default Skeleton;
