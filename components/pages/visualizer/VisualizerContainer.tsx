"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, ChevronLeft } from "lucide-react";
import { AlgorithmSelector } from "@/components/algorithms/AlogorithmSelector";
import { BubbleSortVisualizer } from "@/components/algorithms/BubbleSort";
import { QuickSort } from "@/components/algorithms/QuickSort";
import { MergeSortVisualizer } from "@/components/algorithms/MergeSort";
import { InsertionSort } from "@/components/algorithms/InsertionSort";
import { SelectionSort } from "@/components/algorithms/SelectionSort";
import { HeapSort } from "@/components/algorithms/HeapSort";
import { RadixSort } from "@/components/algorithms/RadixSort";
import { ShellSort } from "@/components/algorithms/ShellSort";

export default function VisualizerContainer() {
  const [algorithm, setAlgorithm] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [data, setData] = useState<number[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    resetData();
  }, [algorithm]);

  const resetData = () => {
    setIsRunning(false);
    setIsDone(false);
    const newData = [...Array(20)].map(
      () => Math.floor(Math.random() * 100) + 1
    );

    if (algorithm === "binary") {
      setData(
        [...Array(20)]
          .map(() => Math.floor(Math.random() * 100) + 1)
          .sort((a, b) => a - b)
      );
    } else {
      setData(newData);
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = resetData;

  const handleStepComplete = (newData: number[], done: boolean) => {
    setData(newData);
    if (done) {
      setIsRunning(false);
      setIsDone(true);
    }
  };

  const renderAlgorithm = () => {
    if (data.length === 0) return null;

    switch (algorithm) {
      case "bubble":
        return (
          <BubbleSortVisualizer
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "quick":
        return (
          <QuickSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "merge":
        return (
          <MergeSortVisualizer
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "insertion":
        return (
          <InsertionSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "selection":
        return (
          <SelectionSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "heap":
        return (
          <HeapSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "radix":
        return (
          <RadixSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      case "shell":
        return (
          <ShellSort
            data={data}
            isRunning={isRunning}
            speed={speed}
            onStepComplete={handleStepComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-4 flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Algorithm Visualization
        </motion.h1>
        <div className="mb-6 flex justify-center space-x-4">
          <AlgorithmSelector onSelect={setAlgorithm} />
          <Button
            onClick={isRunning ? handlePause : handleStart}
            disabled={!algorithm || isDone}
          >
            {isRunning ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleReset} variant="outline" disabled={!algorithm}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
        <div className="mb-6 flex items-center justify-center space-x-4">
          <span className="text-sm font-medium">Speed:</span>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.5}
            max={5}
            step={0.5}
            className="w-[200px]"
          />
          <span className="text-sm font-medium">{speed}x</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {renderAlgorithm()}
        </motion.div>
        {isDone && (
          <div className="mt-6 text-center text-green-500 font-semibold">
            Algorithm completed!
          </div>
        )}
      </main>
    </div>
  );
}
