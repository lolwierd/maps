import React, { useEffect, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre'; // Changed to MapLibre specific import, added MapRef
import maplibregl, { MapLayerMouseEvent } from 'maplibre-gl'; // Removed MaplibreMap alias
import 'maplibre-gl/dist/maplibre-gl.css';
import TooltipComponent from './TooltipComponent'; // Import the TooltipComponent

interface MapComponentProps {
  geojsonData: GeoJSON.FeatureCollection | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ geojsonData }) => {
  const mapRef = useRef<MapRef>(null); // Changed mapRef type
  const [tooltipData, setTooltipData] = useState<{ visible: boolean; x: number; y: number; content: string | null }>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });

  const initialViewState = {
    longitude: 0,
    latitude: 0,
    zoom: 2,
  };

  useEffect(() => {
    if (geojsonData && mapRef.current) {
      const map = mapRef.current.getMap();
      const source = map.getSource('historical-data');

      if (source) {
        (source as maplibregl.GeoJSONSource).setData(geojsonData);
      } else {
        map.addSource('historical-data', {
          type: 'geojson',
          data: geojsonData,
        });

        map.addLayer({
          id: 'historical-layer',
          type: 'fill',
          source: 'historical-data',
          paint: {
            // Use the 'color' property from GeoJSON features, with a fallback
            'fill-color': ['coalesce', ['get', 'color'], '#CCC'],
            'fill-opacity': 0.7,
          },
        });
      }
    }
  }, [geojsonData]);

  const handleMouseMove = (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      if (feature.layer.id === 'historical-layer') {
        setTooltipData({
          visible: true,
          x: event.point.x,
          y: event.point.y,
          content: (feature.properties?.NAME as string) || 'N/A',
        });
      }
    } else {
      setTooltipData(prev => ({ ...prev, visible: false }));
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://demotiles.maplibre.org/style.json" // Generic MapLibre style
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        interactiveLayerIds={['historical-layer']}
      />
      <TooltipComponent
        visible={tooltipData.visible}
        x={tooltipData.x}
        y={tooltipData.y}
        content={tooltipData.content}
      />
    </div>
  );
};

export default MapComponent;
