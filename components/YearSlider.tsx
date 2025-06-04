"use client";

import * as Slider from "@radix-ui/react-slider";

interface YearSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

export default function YearSlider({ min, max, step, value, onChange }: YearSliderProps) {
  return (
    <div className="w-full px-4 py-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-orange-500 rounded-full focus:outline-none"
          aria-label="Year"
        />
      </Slider.Root>
      <div className="text-center mt-2 font-mono text-sm">{labelForYear(value)}</div>
    </div>
  );
}

function labelForYear(year: number) {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}
