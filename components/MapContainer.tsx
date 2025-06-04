"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapContainerProps {
  year: number;
}

export default function MapContainer({ year }: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [allData, setAllData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 30],
      zoom: 1.5,
    });
    map.addControl(new maplibregl.NavigationControl());
    map.on("load", () => {
      map.addSource("historical", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "historical-fill",
        type: "fill",
        source: "historical",
        paint: {
          "fill-color": "#f97316",
          "fill-opacity": 0.4,
        },
      });
      map.addLayer({
        id: "historical-outline",
        type: "line",
        source: "historical",
        paint: {
          "line-color": "#f97316",
          "line-width": 1,
        },
      });
    });
    mapRef.current = map;
  }, []);

  useEffect(() => {
    fetch("/data/sample.geojson")
      .then((res) => res.json())
      .then((data: GeoJSON.FeatureCollection) => setAllData(data));
  }, []);

  useEffect(() => {
    if (!mapRef.current || !allData) return;
    const active = {
      type: "FeatureCollection",
      features: allData.features.filter((f) => {
        const props = f.properties as {
          start_year: number;
          end_year?: number;
        };
        return props.start_year <= year && year <= (props.end_year ?? 9999);
      }),
    } as GeoJSON.FeatureCollection;
    const src = mapRef.current.getSource("historical") as maplibregl.GeoJSONSource;
    src.setData(active);
  }, [year, allData]);

  return <div ref={containerRef} className="w-full h-full" />;
}
