"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InsertionSort({
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (currentIndex < sortedData.length) {
          const key = sortedData[currentIndex];
          let j = currentIndex - 1;
          while (j >= 0 && sortedData[j] > key) {
            sortedData[j + 1] = sortedData[j];
            j--;
          }
          sortedData[j + 1] = key;
          setSortedData([...sortedData]);
          setCurrentIndex(currentIndex + 1);
          onStepComplete([...sortedData], false);
        } else {
          onStepComplete([...sortedData], true);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentIndex, sortedData, speed, onStepComplete]);

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
            className={`w-8 rounded-t relative flex items-end justify-center pb-2 ${
              index === currentIndex ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ minHeight: `${value}%` }}
          >
            <span className="text-black text-sm font-medium ">
              {Math.round(value)}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
