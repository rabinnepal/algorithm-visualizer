"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BubbleSortVisualizer({
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
  const [currentStep, setCurrentStep] = useState(0);
  const [compareIndices, setCompareIndices] = useState<[number, number] | null>(
    null
  );
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setSortedData([...data]);
    setCurrentStep(0);
    setIsSorted(false);
    setCompareIndices(null);
  }, [data]);

  useEffect(() => {
    if (isRunning && !isSorted && currentStep < sortedData.length - 1) {
      const timer = setTimeout(() => {
        let swapped = false;
        const newData = [...sortedData];

        for (let i = 0; i < sortedData.length - currentStep - 1; i++) {
          setCompareIndices([i, i + 1]);

          if (newData[i] > newData[i + 1]) {
            [newData[i], newData[i + 1]] = [newData[i + 1], newData[i]];
            swapped = true;
          }
        }

        setSortedData(newData);
        setCompareIndices(null);
        setCurrentStep(currentStep + 1);

        if (!swapped) {
          setIsSorted(true);
          onStepComplete(newData, true);
        } else {
          onStepComplete(newData, false);
        }
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, sortedData, currentStep, isSorted, speed, onStepComplete]);

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
              compareIndices?.includes(index)
                ? "bg-red-500"
                : index >= sortedData.length - currentStep
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
