"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function QuickSort({
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
  const [sortedData, setSortedData] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [stack, setStack] = useState<[number, number][]>([]);

  useEffect(() => {
    // Reset states when the input data changes
    setSortedData([...data]);
    setStack([[0, data.length - 1]]);
    setPivotIndex(-1);
    setLeftIndex(-1);
    setRightIndex(-1);
  }, [data]);

  useEffect(() => {
    if (isRunning && stack.length > 0) {
      const timer = setTimeout(() => {
        const newStack = [...stack];
        const [low, high] = newStack.pop()!; // Pop the last range from the stack
        if (low < high) {
          const pivot = sortedData[high];
          let i = low - 1;

          // Partition the array
          for (let j = low; j < high; j++) {
            if (sortedData[j] < pivot) {
              i++;
              [sortedData[i], sortedData[j]] = [sortedData[j], sortedData[i]];
            }
          }
          [sortedData[i + 1], sortedData[high]] = [
            sortedData[high],
            sortedData[i + 1],
          ];
          const pi = i + 1;

          // Update stack with new partitions
          newStack.push([low, pi - 1], [pi + 1, high]);

          // Update state for visualization
          setPivotIndex(pi);
          setLeftIndex(low);
          setRightIndex(high);
        }
        setStack(newStack);
        setSortedData([...sortedData]);
        onStepComplete([...sortedData], newStack.length === 0);

        // Clear state once sorting is complete
        if (newStack.length === 0) {
          setPivotIndex(-1);
          setLeftIndex(-1);
          setRightIndex(-1);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, stack, sortedData, speed, onStepComplete]);

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
              index === pivotIndex
                ? "bg-red-500"
                : index === leftIndex || index === rightIndex
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
