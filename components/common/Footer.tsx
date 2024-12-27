import Link from "next/link";
import { BarChart2, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t container">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BarChart2 className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built with love. The source code is available on{" "}
            {/* <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Algo Insights
            </Link> */}
            <a
              href="https://github.com/rabinnepal/algorithm-visualizer"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        © 2025 Algo Insights. All rights reserved.
        <div className="flex items-center space-x-4">
          <Link
            href="/terms"
            className="text-sm hover:underline underline-offset-4"
          >
            Terms
          </Link>
          <span className="text-sm text-muted-foreground">·</span>
          <Link
            href="/privacy"
            className="text-sm hover:underline underline-offset-4"
          >
            Privacy
          </Link>
          <span className="text-sm text-muted-foreground">·</span>
          <Link
            href="https://github.com/rabinnepal"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/rabinnepal0"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
