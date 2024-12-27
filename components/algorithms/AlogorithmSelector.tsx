"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const algorithms = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "quick", label: "Quick Sort" },
  { value: "merge", label: "Merge Sort" },
  { value: "insertion", label: "Insertion Sort" },
  { value: "selection", label: "Selection Sort" },
  { value: "heap", label: "Heap Sort" },
  { value: "radix", label: "Radix Sort" },
  { value: "shell", label: "Shell Sort" },
];

export function AlgorithmSelector({
  onSelect = () => {},
}: {
  onSelect?: (value: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!value) {
      const defaultAlgorithm = algorithms[0].value;
      setValue(defaultAlgorithm);
      onSelect(defaultAlgorithm);
    }
  }, [onSelect, value]);

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        setValue(selectedValue);
        onSelect(selectedValue);
      }}
    >
      <SelectTrigger className="w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select algorithm..." />
      </SelectTrigger>
      <SelectContent>
        {algorithms.map((algorithm) => (
          <SelectItem key={algorithm.value} value={algorithm.value}>
            {algorithm.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
