import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  const [showLegend, setShowLegend] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  
  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (mapInstance) {
        try {
          // Remove all layers and sources
          if (mapInstance.getLayer('route-line')) {
            mapInstance.removeLayer('route-line');
          }
          if (mapInstance.getLayer('route-points')) {
            mapInstance.removeLayer('route-points');
          }
          if (mapInstance.getSource('route')) {
            mapInstance.removeSource('route');
          }
          // Remove the map instance
          mapInstance.remove();
        } catch (error) {
          console.warn('Error during map cleanup:', error);
        }
      }
    };
  }, [mapInstance]);

  // Function to safely get map source
  const safeGetSource = useCallback((sourceId: string) => {
    if (!mapInstance || !mapInstance.getSource) return null;
    try {
      return mapInstance.getSource(sourceId);
    } catch (error) {
      console.warn(`Error getting source ${sourceId}:`, error);
      return null;
    }
  }, [mapInstance]);

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
            coordinates: [tech.currentLocation.lng, tech.currentLocation.lat],
          };
        } else {
          // Generate some random points within a reasonable distance from current location
          const jitter = ((i + 1) * 0.01) + (techSeed * 0.005);
          const baseLat = tech.currentLocation?.lat || 34.0522;
          const baseLng = tech.currentLocation?.lng || -118.2437;

          // Sample points from the array or use generated ones
          const point = mockHistoryPoints[i % mockHistoryPoints.length];
          return {
            time: point.time,
            location: point.location,
            coordinates: [
              baseLng - jitter * (techSeed % 2 === 0 ? 1 : -1),
              baseLat - jitter * (techSeed % 3 === 0 ? 1 : -1)
            ],
          };
        }
      });

      acc[tech.id] = history;
      return acc;
    }, {});
  }, [technicians]);

  // Calculate route statistics for selected technician
  // This effect is redundant with the routeStats useMemo above
  // Removing this effect as it's using a non-existent setRouteStats function

  // Safely check if a layer exists without throwing errors
  const safeLayerExists = useCallback((layerId: string): boolean => {
    if (!mapInstance) return false;
    try {
      return mapInstance.getLayer(layerId) !== undefined;
    } catch (e) {
      console.warn(`Error checking if layer ${layerId} exists:`, e);
      return false;
    }
  }, [mapInstance]);

  // Safely check if a source exists without throwing errors
  const safeSourceExists = useCallback((sourceId: string): boolean => {
    if (!mapInstance) return false;
    try {
      return mapInstance.getSource(sourceId) !== undefined;
    } catch (e) {
      console.warn(`Error checking if source ${sourceId} exists:`, e);
      return false;
    }
  }, [mapInstance]);
  
  // Handle marker click - show travel history and fly to location
  const handleMarkerClick = useCallback((technicianId: string) => {
    // If we have a selection handler from props, use it
    if (onTechnicianSelect) {
      onTechnicianSelect(technicianId);
    }
    
    // Only proceed if we have a map instance
    if (!mapInstance) {
      console.warn('Map instance not ready');
      return;
    }
    
    // Find the technician data
    const technician = technicians.find(t => t.id === technicianId);
    if (!technician || !travelHistory[technicianId]) {
      console.warn('Technician or travel history not found');
      return;
    }
    
    const history = travelHistory[technicianId];
    
    // Safely clean up existing layers and sources
    try {
      // Only remove layers/sources if they exist
      if (safeLayerExists('route-line')) {
        mapInstance.removeLayer('route-line');
      }
      
      if (safeLayerExists('route-points')) {
        mapInstance.removeLayer('route-points');
      }
      
      if (safeSourceExists('route')) {
        mapInstance.removeSource('route');
      }
    } catch (error) {
      console.warn('Error cleaning up previous route:', error);
      // Continue with new route creation even if cleanup fails
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
      
      // Create a GeoJSON source for the route safely
      try {
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
        
        // Only add the source if it doesn't already exist
        if (!safeSourceExists('route')) {
          mapInstance.addSource('route', {
            type: 'geojson',
            data: routeData
          });
        } else {
          // Update existing source data
          const source = mapInstance.getSource('route') as mapboxgl.GeoJSONSource;
          if (source && source.setData) {
            source.setData(routeData);
          }
        }
      } catch (error) {
        console.error('Error creating route source:', error);
        return; // Exit early if we can't create the source
      }
      
      // Add a line layer for the route safely
      try {
        if (!safeLayerExists('route-line')) {
          mapInstance.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#4B5563', // gray-600 (using neutral gray palette)
              'line-width': 3,
              'line-dasharray': [1, 1]
            }
          });
        }
      } catch (error) {
        console.error('Error adding route line layer:', error);
      }
      
      // Add circle points for each history point safely
      try {
        if (!safeLayerExists('route-points')) {
          mapInstance.addLayer({
            id: 'route-points',
            type: 'circle',
            source: 'route',
            paint: {
              'circle-radius': 5,
              'circle-color': '#4B5563', // gray-600 (using neutral gray palette)
              'circle-stroke-width': 1,
              'circle-stroke-color': '#ffffff'
            }
          });
        }
      } catch (error) {
        console.error('Error adding route points layer:', error);
      }
      
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

  // Calculate route statistics for selected technician
  const routeStats = useMemo(() => {
    if (!selectedTechnicianId) return null;
    
    const history = travelHistory[selectedTechnicianId] || [];
    if (history.length < 2) return null;
    
    // Calculate distance in miles (approximate using simple formula)
    let totalDistance = 0;
    for (let i = 1; i < history.length; i++) {
      const [prevLng, prevLat] = history[i-1].coordinates;
      const [currLng, currLat] = history[i].coordinates;
      
      // Approximate distance calculation
      const latDiff = Math.abs(currLat - prevLat) * 69; // ~69 miles per degree latitude
      const lngDiff = Math.abs(currLng - prevLng) * 55; // ~55 miles per degree longitude at this latitude
      
      const segmentDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      totalDistance += segmentDistance;
    }
    
    return {
      distance: totalDistance.toFixed(1),
      stops: history.length,
      timeActive: '5h 23m', // Mocked for demo
      nextJob: '30m away' // Mocked for demo
    };
  }, [selectedTechnicianId, travelHistory]);
  
  // Empty comment to avoid duplicate renderPlaceholder function

  // Render placeholders function definition moved to top level to avoid hook rule violations
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
    <div className="space-y-4 relative">
      <MapContainer
        markers={markers}
        center={mapCenter}
        zoom={markers.length > 0 ? 12 : 10}
        className={className}
        showDirectionsButton={true}
        selectedMarkerId={selectedTechnicianId}
        onMapLoad={handleMapLoad}
      />
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={() => setShowLegend(!showLegend)}
          className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-200 dark:border-gray-700"
          title="Toggle Travel History Legend"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      {/* Travel history legend */}
      {showLegend && (
        <div className="absolute left-4 top-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md text-sm max-w-xs border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">Travel History Legend</h3>
            <button 
              onClick={() => setShowLegend(false)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-400 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Travel path</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-400 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Travel checkpoint</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-gray-600 dark:border-gray-400 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Current location</span>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              <p>Click on a technician marker to view their travel history on the map.</p>
            </div>
          </div>
        </div>
      )}

      {/* Selected technician route stats (shows when a technician is selected and has route data) */}
      {selectedTechnicianId && routeStats && (
        <div className="absolute left-4 bottom-12 z-10 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md max-w-xs border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2">Travel Stats</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Distance</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{routeStats.distance} miles</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Stops</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{routeStats.stops} locations</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Time active</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{routeStats.timeActive}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Next job</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">{routeStats.nextJob}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Status legend */}
      <div className="flex flex-wrap items-center gap-4 px-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
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
