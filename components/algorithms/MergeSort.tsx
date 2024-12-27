"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MergeSortVisualizer({
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
  const [animations, setAnimations] = useState<[number, number][]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const resetVisualizer = useCallback(() => {
    const initialArray = [...data];
    const auxArray = [...data];
    const anims: [number, number][] = [];

    setSortedData(initialArray);
    setAnimations([]);
    setCurrentStep(0);

    if (initialArray.length > 0) {
      mergeSortHelper(
        initialArray,
        0,
        initialArray.length - 1,
        auxArray,
        anims
      );
      setAnimations(anims);
    }
  }, [data]);

  useEffect(() => {
    resetVisualizer();
  }, [resetVisualizer]);

  useEffect(() => {
    if (isRunning && currentStep < animations.length) {
      const timer = setTimeout(() => {
        const [index, newValue] = animations[currentStep];
        const newData = [...sortedData];
        newData[index] = newValue;

        setSortedData(newData);
        setCurrentStep(currentStep + 1);

        onStepComplete(newData, currentStep === animations.length - 1);
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentStep, sortedData, animations, speed, onStepComplete]);

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
              index === animations[currentStep]?.[0]
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Move these utility functions outside the component
function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxArray: number[],
  anims: [number, number][]
) {
  if (startIdx >= endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);

  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, anims);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, anims);
  merge(mainArray, startIdx, middleIdx, endIdx, auxArray, anims);
}

function merge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxArray: number[],
  anims: [number, number][]
) {
  let i = startIdx;
  let j = middleIdx + 1;
  let k = startIdx;

  while (i <= middleIdx && j <= endIdx) {
    if (auxArray[i] <= auxArray[j]) {
      anims.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      anims.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= middleIdx) {
    anims.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIdx) {
    anims.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
