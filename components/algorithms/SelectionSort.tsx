"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SelectionSort({
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
  const [currentMinIndex, setCurrentMinIndex] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (currentPass < sortedData.length - 1) {
          let minIndex = currentPass;
          for (let i = currentPass + 1; i < sortedData.length; i++) {
            if (sortedData[i] < sortedData[minIndex]) {
              minIndex = i;
            }
          }
          if (minIndex !== currentPass) {
            [sortedData[currentPass], sortedData[minIndex]] = [
              sortedData[minIndex],
              sortedData[currentPass],
            ];
            setSortedData([...sortedData]);
          }
          setCurrentMinIndex(currentPass);
          setCurrentPass(currentPass + 1);
          onStepComplete([...sortedData], false);
        } else {
          onStepComplete([...sortedData], true);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentPass, sortedData, speed, onStepComplete]);

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
              index === currentMinIndex ? "bg-orange-500" : "bg-blue-500"
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
