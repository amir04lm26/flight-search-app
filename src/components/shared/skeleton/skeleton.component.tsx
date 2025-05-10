// src/components/shared/skeleton/skeleton.component.tsx

import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  circle = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-300 dark:bg-gray-700",
        circle ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height }}
      data-testid='skeleton'
    />
  );
};
