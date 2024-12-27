"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Zap,
  Share2,
  Cpu,
  LineChart,
  Network,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Multiple Algorithms",
      description:
        "Explore a wide range of sorting, searching, and graph algorithms.",
    },
    {
      icon: Zap,
      title: "Real-time Visualization",
      description:
        "Watch algorithms work step-by-step with adjustable speed controls.",
    },
    {
      icon: Share2,
      title: "Share and Collaborate",
      description:
        "Easily share visualizations with peers or embed them in your projects.",
    },
    {
      icon: Cpu,
      title: "Performance Metrics",
      description:
        "Analyze algorithm efficiency with built-in performance measurements.",
    },
    {
      icon: LineChart,
      title: "Comparative Analysis",
      description:
        "Compare multiple algorithms side-by-side for better understanding.",
    },
    {
      icon: Network,
      title: "Custom Input",
      description:
        "Input your own datasets to see how algorithms perform in different scenarios.",
    },
  ];

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <Link
          href="/"
          className="mb-4 flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Features
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the powerful features that make Algo Insights the
                perfect tool for learning and understanding algorithms.
              </p>
            </motion.div>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg"
                >
                  <feature.icon className="h-8 w-8 text-indigo-500" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of students and developers who are already using
                Algo Insights to enhance their understanding of algorithms.
              </p>
              <Link href="/visualize">
                <Button size="lg">
                  Try Algo Insights Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
