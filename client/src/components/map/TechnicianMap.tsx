import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MapContainer from './MapContainer';
import { Technician } from '../../types/task';
import { DEFAULT_CENTER } from '../../config/mapConfig';
import mapboxgl from 'mapbox-gl';

interface TechnicianMapProps {
  technicians: Technician[];
  className?: string;
  onTechnicianSelect?: (technicianId: string) => void;
  selectedTechnicianId?: string;
}

interface TravelHistoryPoint {
  time: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
}

type TravelHistoryRecord = Record<string, TravelHistoryPoint[]>;

interface TechnicianMarker {
  id: string;
  longitude: number;
  latitude: number;
  title: string;
  description?: string;
  color?: string;
  onClick?: () => void;
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties: Record<string, any>;
}

interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

const TechnicianMap: React.FC<TechnicianMapProps> = ({
  technicians,
  className = '',
  onTechnicianSelect,
  selectedTechnicianId
}) => {
  const [markers, setMarkers] = useState<TechnicianMarker[]>([]);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  // Get color based on technician status
  const getTechnicianStatusColor = useCallback((status?: string): string => {
    switch (status) {
      case 'available':
        return '#10B981'; // teal-500 - Available
      case 'assigned':
        return '#3B82F6'; // blue-500 - Assigned
      case 'on_break':
        return '#F59E0B'; // amber-500 - On Break
      case 'unavailable':
        return '#EF4444'; // red-500 - Unavailable
      default:
        return '#6B7280'; // gray-500 - Unknown status
    }
  }, []);

  // Mock travel history data for demonstration
  const travelHistory = useMemo<TravelHistoryRecord>(() => {
    const mockHistoryPoints: TravelHistoryPoint[] = [
      { time: '9:00 AM', location: 'Downtown LA', coordinates: [-118.2437, 34.0522] },
      { time: '11:30 AM', location: 'Hollywood', coordinates: [-118.3409, 34.0825] },
      { time: '2:15 PM', location: 'Santa Monica', coordinates: [-118.4814, 34.0211] },
    ];
    
    return technicians.reduce<TravelHistoryRecord>((acc, tech) => {
      // Generate random but consistent history for each technician
      const techSeed = tech.id.charCodeAt(0) % 10;
      const historyCount = (techSeed % 3) + 2; // 2-4 history points
      
      // Create history array with the current location as the last point
      const history = Array(historyCount).fill(null).map((_, i): TravelHistoryPoint => {
        if (i === historyCount - 1 && tech.currentLocation) {
          // Last point is current location
          return {
            time: new Date(tech.currentLocation.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            location: 'Current Location',
            coordinates: [tech.currentLocation.lng, tech.currentLocation.lat] as [number, number]
          };
        } else {
          // Previous locations - use offset from nearby locations
          const basePoint = mockHistoryPoints[i % mockHistoryPoints.length];
          const offset = {
            lng: ((techSeed * 0.01) - 0.005) * (i + 1),
            lat: ((techSeed * 0.01) - 0.005) * (i + 1)
          };
          return {
            time: basePoint.time,
            location: basePoint.location,
            coordinates: [basePoint.coordinates[0] + offset.lng, basePoint.coordinates[1] + offset.lat] as [number, number]
          };
        }
      });
      
      acc[tech.id] = history;
      return acc;
    }, {});
  }, [technicians]);

  // Handle marker click - show travel history and fly to location
  const handleMarkerClick = useCallback((technicianId: string) => {
    // If we have a selection handler from props, use it
    if (onTechnicianSelect) {
      onTechnicianSelect(technicianId);
    }
    
    // Only proceed if we have a map instance
    if (!mapInstance) return;
    
    // Find the technician data
    const technician = technicians.find(t => t.id === technicianId);
    if (!technician || !travelHistory[technicianId]) return;
    
    const history = travelHistory[technicianId];
    
    // Clear previous route if any
    if (mapInstance.getSource('route')) {
      mapInstance.removeLayer('route-line');
      mapInstance.removeLayer('route-points');
      mapInstance.removeSource('route');
    }
    
    // If we have travel history, show it
    if (history && history.length > 1) {
      // Fly to the location with a nice animation
      const lastPoint = history[history.length - 1].coordinates;
      mapInstance.flyTo({
        center: lastPoint,
        zoom: 13,
        speed: 1.2,
        curve: 1.42,
        essential: true
      });
      
      // Create a GeoJSON source for the route
      const routeData: GeoJSONData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: history.map(point => point.coordinates)
            },
            properties: {}
          }
        ]
      };
      
      mapInstance.addSource('route', {
        type: 'geojson',
        data: routeData
      });
      
      // Add a line layer for the route
      mapInstance.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#0ea5e9', // sky-500
          'line-width': 3,
          'line-dasharray': [1, 1]
        }
      });
      
      // Add circle points for each history point
      mapInstance.addLayer({
        id: 'route-points',
        type: 'circle',
        source: 'route',
        paint: {
          'circle-radius': 5,
          'circle-color': '#0ea5e9',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff'
        }
      });
      
      // Fit bounds to show the entire path
      const bounds = new mapboxgl.LngLatBounds();
      history.forEach(point => bounds.extend(point.coordinates as [number, number]));
      
      mapInstance.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [mapInstance, technicians, travelHistory, onTechnicianSelect]);

  // Create markers from technician data
  const technicianMarkers = useMemo(() => {
    if (!technicians || technicians.length === 0) return [];
    
    return technicians
      .filter(tech => {
        // Only create markers for technicians with valid location data
        if (!tech.currentLocation) {
          console.log('Technician missing location:', tech.id, tech.name);
          return false;
        }
        
        // Check for valid coordinates
        const hasValidCoordinates = 
          typeof tech.currentLocation.lat === 'number' && 
          typeof tech.currentLocation.lng === 'number' && 
          !isNaN(tech.currentLocation.lat) && 
          !isNaN(tech.currentLocation.lng);
        
        if (!hasValidCoordinates) {
          console.log('Technician has invalid coordinates:', tech.id, tech.name);
        }
        
        return hasValidCoordinates;
      })
      .map(tech => {
        return {
          id: tech.id,
          latitude: Number(tech.currentLocation!.lat),
          longitude: Number(tech.currentLocation!.lng),
          title: tech.name,
          description: `
            <strong>${tech.name}</strong><br/>
            Status: ${tech.status || 'Unknown'}<br/>
            ${tech.role ? `Role: ${tech.role}<br/>` : ''}
          `,
          color: getTechnicianStatusColor(tech.status),
          onClick: () => handleMarkerClick(tech.id)
        };
      });
  }, [technicians, handleMarkerClick]);

  // Set markers when they change
  useEffect(() => {
    console.log('TechnicianMap: Generated markers:', technicianMarkers?.length || 0);
    setMarkers(technicianMarkers || []);
  }, [technicianMarkers]);

  // Handle map load to capture the map instance
  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    console.log('Map instance loaded and captured');
    setMapInstance(map);
    
    // If a technician is selected, show their travel history
    if (selectedTechnicianId) {
      setTimeout(() => {
        handleMarkerClick(selectedTechnicianId);
      }, 500); // Small delay to ensure map is fully loaded
    }
  }, [selectedTechnicianId, handleMarkerClick]);

  // Memoized map center calculation
  const mapCenter = useMemo<[number, number]>(() => {
    return markers.length > 0 ? 
      [markers[0].longitude, markers[0].latitude] as [number, number] : 
      DEFAULT_CENTER;
  }, [markers]);

  // Render placeholders if needed
  const renderPlaceholder = (message: string) => (
    <div className={`${className || ''} flex items-center justify-center bg-gray-100 dark:bg-gray-700 h-full w-full min-h-[400px]`}>
      <p className="text-gray-500 dark:text-gray-300">{message}</p>
    </div>
  );

  // Early render check for no technicians
  if (!technicians || technicians.length === 0) {
    console.log('TechnicianMap: Rendering placeholder - No technicians data');
    return renderPlaceholder('No technicians data available.');
  }
  
  // Check for markers specifically
  if (markers.length === 0) {
    console.log('TechnicianMap: Rendering placeholder - No valid location data');
    return renderPlaceholder('No technicians with valid location data available.');
  }

  return (
    <div className="space-y-4">
      <MapContainer
        markers={markers}
        center={mapCenter}
        zoom={markers.length > 0 ? 12 : 10}
        className={className}
        showDirectionsButton={true}
        selectedMarkerId={selectedTechnicianId}
        onMapLoad={handleMapLoad}
      />
      <div className="flex flex-wrap items-center gap-4 px-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Legend:</p>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Available</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Assigned</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">On Break</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicianMap;
