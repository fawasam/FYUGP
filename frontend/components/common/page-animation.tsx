"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";

interface AnimationWrapperProps {
  children?: ReactNode;
  keyValue?: string;
  initial?: any;
  animate?: any;
  transition?: Transition;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
