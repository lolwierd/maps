import React from 'react';
import { Slider } from '@/components/ui/slider';

interface YearSliderComponentProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

const YearSliderComponent: React.FC<YearSliderComponentProps> = ({ currentYear, onYearChange }) => {
  const realWorldYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <label htmlFor="yearSlider" className="block text-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
        Year: {currentYear}
      </label>
      <Slider
        id="yearSlider"
        min={-3000}
        max={realWorldYear}
        step={50}
        value={[currentYear]}
        onValueChange={(value) => onYearChange(value[0])}
        className="w-full"
      />
    </div>
  );
};

export default YearSliderComponent;
