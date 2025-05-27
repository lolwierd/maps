"use client"; // Required for useState and event handlers

import React, { useState, useEffect } from 'react';
import MapComponent from '@/components/MapComponent';
import YearSliderComponent from '@/components/YearSliderComponent';

// Define the type for GeoJSON data explicitly for clarity, 
// matching what MapComponent expects (or a subset if only passing through)
// For now, as geojsonData is initialized to null and not yet fetched,
// we can use a simpler type or rely on MapComponent's prop type.
type GeoJsonDataType = GeoJSON.FeatureCollection | null;

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState<number>(1000);
  const [geojsonData, setGeojsonData] = useState<GeoJsonDataType>(null);

  useEffect(() => {
    let geojsonPath: string | null = null;
    if (currentYear >= -250 && currentYear <= 500) {
      geojsonPath = '/geojson/0_ce.geojson';
    } else if (currentYear >= 501 && currentYear <= 1250) {
      geojsonPath = '/geojson/1000_ce.geojson';
    } else if (currentYear >= 1251 && currentYear <= 1750) {
      geojsonPath = '/geojson/1500_ce.geojson';
    }

    if (geojsonPath) {
      fetch(geojsonPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setGeojsonData(data as GeoJSON.FeatureCollection))
        .catch(error => {
          console.error("Could not fetch GeoJSON data:", error);
          setGeojsonData({ type: "FeatureCollection", features: [] });
        });
    } else {
      setGeojsonData({ type: "FeatureCollection", features: [] });
    }
  }, [currentYear]); // Dependency array includes currentYear

  return (
    <div className="flex flex-col h-screen w-screen m-0 p-0 overflow-hidden">
      <div className="flex-grow relative w-full">
        <MapComponent geojsonData={geojsonData} />
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-slate-100 dark:bg-slate-800">
        <YearSliderComponent
          currentYear={currentYear}
          onYearChange={(newYear) => setCurrentYear(newYear)}
        />
      </div>
    </div>
  );
}
