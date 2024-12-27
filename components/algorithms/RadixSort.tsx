"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getDigit(num: number, place: number) {
  return Math.floor((num / Math.pow(10, place)) % 10);
}

function countingSort(arr: number[], place: number) {
  const output: number[] = new Array(arr.length);
  const count: number[] = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const digit = getDigit(arr[i], place);
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = getDigit(arr[i], place);
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

export function RadixSort({
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
  const [currentDigit, setCurrentDigit] = useState(0);
  const maxDigits = Math.max(...data).toString().length;

  useEffect(() => {
    if (isRunning && currentDigit < maxDigits) {
      const timer = setTimeout(() => {
        countingSort(sortedData, currentDigit);
        setSortedData([...sortedData]);
        setCurrentDigit(currentDigit + 1);
        onStepComplete([...sortedData], currentDigit + 1 >= maxDigits);
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentDigit, sortedData, speed, onStepComplete, maxDigits]);

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
            className={`w-8 rounded-t relative flex items-end justify-center pb-2 bg-cyan-500`}
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
