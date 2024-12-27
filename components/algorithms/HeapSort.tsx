"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

export function HeapSort({
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
  const [heapSize, setHeapSize] = useState(sortedData.length);
  //   const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (heapSize > 1) {
          heapify(sortedData, heapSize, 0);
          [sortedData[0], sortedData[heapSize - 1]] = [
            sortedData[heapSize - 1],
            sortedData[0],
          ];
          setHeapSize(heapSize - 1);
          setSortedData([...sortedData]);
          onStepComplete([...sortedData], false);
        } else {
          onStepComplete([...sortedData], true);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, heapSize, sortedData, speed, onStepComplete]);

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
              index < heapSize ? "bg-purple-500" : "bg-blue-500"
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
