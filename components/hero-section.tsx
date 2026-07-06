import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const steps = [
  { number: 1, title: "Upload PDF", description: "Add your book file" },
  { number: 2, title: "AI Processing", description: "We analyze the content" },
  { number: 3, title: "Voice Chat", description: "Discuss with AI" },
];
// Books samples.
export function HeroSection() {
  return (
    <section className="wrapper pt-28 py-8 px-4 mb-10 md:mb-16 sm:py-12 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Warm beige card container - responsive grid */}
        <div
          className="rounded-lg sm:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 md:p-12 
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {/* Left Section */}
          <div className="flex flex-col justify-center order-1">
            <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-mona-sans text-gray-900 leading-tight">
              Your Library
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-700 leading-relaxed">
              Convert your books into interactive AI conversations. Listen,
              learn, and discuss your favorite reads.
            </p>
            {/* ADD A NEW BOOK BUTTON SHOULD GO TO THE ADD BOOK PAGE */}
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-fit gap-2 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 text-sm sm:text-base"
            >
              <Link href="/books/new">
                <Plus className="size-4 sm:size-5" />
                Add new book
              </Link>
            </Button>
          </div>

          {/* Center Section - Illustration */}
          <div className="flex items-center justify-center order-3 sm:order-2 col-span-1 sm:col-span-2 lg:col-span-1 min-h-56 sm:min-h-64">
            <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 flex items-center justify-center">
              {/* Vintage Books & Globe Illustration SVG */}
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Books stack - bottom left */}
                <rect
                  x="40"
                  y="160"
                  width="45"
                  height="35"
                  fill="#8B5A3C"
                  rx="2"
                />
                <rect
                  x="50"
                  y="145"
                  width="45"
                  height="35"
                  fill="#A0644E"
                  rx="2"
                />
                <rect
                  x="60"
                  y="130"
                  width="45"
                  height="35"
                  fill="#8B4513"
                  rx="2"
                />

                {/* Globe */}
                <circle cx="160" cy="110" r="45" fill="#9B8B6B" opacity="0.3" />
                <circle
                  cx="160"
                  cy="110"
                  r="45"
                  fill="url(#globeGradient)"
                  stroke="#6B5D4F"
                  strokeWidth="2"
                />
                <path
                  d="M130 80 Q160 75 190 80"
                  stroke="#8B7355"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />

                {/* Lamp - top right */}
                <rect x="210" y="40" width="3" height="80" fill="#6B5D4F" />
                <path
                  d="M200 40 Q215 30 230 40 Q220 35 215 35 Q210 35 200 40"
                  fill="#9B8B6B"
                />
                <ellipse
                  cx="215"
                  cy="38"
                  rx="15"
                  ry="8"
                  fill="#D4A574"
                  opacity="0.7"
                />

                {/* Open book - center bottom */}
                <path
                  d="M130 190 L145 170 L160 190 L145 185 Z"
                  fill="#A0644E"
                />
                <rect x="130" y="190" width="15" height="40" fill="#8B5A3C" />
                <rect x="145" y="190" width="15" height="40" fill="#A0644E" />
                <line
                  x1="145"
                  y1="190"
                  x2="145"
                  y2="230"
                  stroke="#6B5D4F"
                  strokeWidth="1"
                />

                {/* Decorative elements */}
                <circle cx="110" cy="100" r="3" fill="#8B7355" opacity="0.5" />
                <circle cx="190" cy="150" r="2" fill="#8B7355" opacity="0.5" />

                <defs>
                  <radialGradient id="globeGradient" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#B5A47B" />
                    <stop offset="100%" stopColor="#8B7D6B" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Section - Steps Card */}
          <div className="flex flex-col justify-center order-2 sm:order-3 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="space-y-4 sm:space-y-6 rounded-xl bg-white p-5 sm:p-6 shadow-md">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-3 sm:gap-4">
                  {/* Numbered Circle */}
                  <div className="flex items-start flex-shrink-0">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-gray-800">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-0.5">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 sm:mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
