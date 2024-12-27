"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About Algo Viz
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Empowering learners to visualize and understand complex
                algorithms with ease.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 space-y-4"
            >
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-gray-500 dark:text-gray-400">
                At Algo Viz, we believe that understanding algorithms is
                fundamental to computer science education and software
                development. Our mission is to make algorithm learning
                accessible, interactive, and engaging for everyone, from
                students to seasoned professionals.
              </p>
              <h2 className="text-2xl font-bold mt-6">Our Story</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Founded by a team of passionate computer scientists and
                educators, Algo Viz was born out of the frustration of
                traditional, static methods of teaching algorithms. We set out
                to create a platform that brings algorithms to life, allowing
                learners to see how they work in real-time and experiment with
                different inputs and scenarios.
              </p>
              <h2 className="text-2xl font-bold mt-6">Our Impact</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Since our launch, Algo Viz has helped thousands of students and
                developers worldwide to deepen their understanding of
                algorithms. Our platform is used in classrooms, coding
                bootcamps, and by self-learners who are passionate about
                improving their algorithmic thinking skills.
              </p>
            </motion.div>
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
                Join Our Community
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Be part of a growing community of algorithm enthusiasts. Learn,
                share, and grow together.
              </p>
              <Button size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
