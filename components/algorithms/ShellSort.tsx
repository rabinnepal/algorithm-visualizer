"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ShellSort({
  data,
  isRunning,
  speed,
  onStepComplete,
}: {
  data: number[];
  isRunning: boolean;
  speed: number;
  onStepComplete: (newData: number[], isDone: boolean) => void;
}) {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [gap, setGap] = useState(Math.floor(sortedData.length / 2));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (gap > 0) {
          if (currentIndex + gap < sortedData.length) {
            if (sortedData[currentIndex] > sortedData[currentIndex + gap]) {
              [sortedData[currentIndex], sortedData[currentIndex + gap]] = [
                sortedData[currentIndex + gap],
                sortedData[currentIndex],
              ];
              setSortedData([...sortedData]);
            }
            setCurrentIndex(currentIndex + 1);
            onStepComplete([...sortedData], false);
          } else {
            setGap(Math.floor(gap / 2));
            setCurrentIndex(0);
            onStepComplete([...sortedData], gap <= 0);
          }
        } else {
          onStepComplete([...sortedData], true);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, gap, sortedData, speed, onStepComplete, currentIndex]);

  return (
    <div className="h-64 flex items-end justify-around">
      <AnimatePresence>
        {sortedData.map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${value}%` }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-8 rounded-t ${
              index % gap === 0 ? "bg-pink-500" : "bg-blue-500"
            }`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
