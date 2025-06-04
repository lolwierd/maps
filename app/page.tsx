'use client';
import { useState } from 'react';
import MapContainer from '@/components/MapContainer';
import YearSlider from '@/components/YearSlider';

export default function Home() {
  const MIN_YEAR = -500;
  const MAX_YEAR = 500;
  const STEP = 50;
  const [year, setYear] = useState(0);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 min-h-0 relative">
        <MapContainer year={year} />
      </div>
      <YearSlider
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={STEP}
        value={year}
        onChange={setYear}
      />
    </div>
  );
}
