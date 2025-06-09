import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set the mapbox token directly to ensure it's always available
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF3bXRoZWRldiIsImEiOiJjbWJmcG5nZHUwMGdpMmxweTF0eGhoY3FqIn0.Kiu_883HQPYPC9Bf6ZnYcQ';

// Default map center (US) and zoom level
const DEFAULT_CENTER: [number, number] = [-95.7129, 37.0902];
const DEFAULT_ZOOM = 3.5;

// Define marker interface
export interface MapMarker {
  id: string | number;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  color?: string;
  onClick?: () => void;
  customClass?: string;
  popupOpenCallback?: (element: HTMLElement) => void;
}

// Define component props
export interface MapContainerProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  showDirectionsButton?: boolean;
  selectedMarkerId?: string | number | null;
  onMapLoad?: (map: mapboxgl.Map) => void;
  onMarkerClick?: (markerId: string | number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  markers = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className = 'h-96 w-full rounded-lg',
  showDirectionsButton = false,
  selectedMarkerId = null,
  onMapLoad,
  onMarkerClick,
}) => {
  // Refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<{ [key: string]: mapboxgl.Marker }>({});
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapContainer.current) return;
    
    try {
      console.log('MapContainer: Initializing map with center:', center, 'and zoom:', zoom);
      
      // Create a new map instance
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        attributionControl: false
      });
      
      // Add navigation control
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add attribution control
      newMap.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');
      
      // Set up event listeners
      newMap.on('load', () => {
        console.log('MapContainer: Map loaded successfully');
        setIsLoading(false);
        setMapReady(true);
        if (onMapLoad) {
          onMapLoad(newMap);
        }
      });
      
      newMap.on('error', (e: any) => {
        console.error('MapContainer: Map error:', e);
        setError(`Failed to load map: ${e.error?.message || 'Unknown error'}`);
        setIsLoading(false);
      });
      
      // Set the map instance in the ref
      map.current = newMap;
      
      // Cleanup function
      return () => {
        // First remove any markers to avoid marker-related errors during cleanup
        try {
          Object.values(markerRefs.current).forEach(marker => {
            try {
              marker.remove();
            } catch (err) {
              console.warn('Error removing marker during cleanup:', err);
            }
          });
          markerRefs.current = {};
        } catch (err) {
          console.warn('Error cleaning up markers:', err);
        }
        
        // Then remove the map itself
        try {
          if (map.current) {
            console.log('MapContainer: Removing map instance');
            map.current.remove();
            map.current = null;
          }
        } catch (err) {
          console.error('Error removing map during cleanup:', err);
        }
      };
    } catch (error: any) {
      console.error('MapContainer: Error initializing map:', error);
      setError(`Failed to initialize map: ${error.message}`);
      setIsLoading(false);
    }
  }, [center, zoom, onMapLoad]);

  // Update markers when they change or map becomes ready
  useEffect(() => {
    // Only proceed if map is ready and exists
    if (!map.current || !mapReady) return;
    
    console.log('MapContainer: Updating markers, count:', markers.length);
    
    // Create a local reference to ensure we don't access map after it's removed
    const currentMap = map.current;
    
    // Clear existing markers safely
    Object.values(markerRefs.current).forEach((marker) => {
      try {
        marker.remove();
      } catch (err) {
        console.warn('Error removing marker:', err);
      }
    });
    markerRefs.current = {};
    
    // Add or update markers on the map
    markers.forEach((marker) => {
      try {
        // Skip if coordinates are invalid
        if (
          typeof marker.latitude !== 'number' ||
          typeof marker.longitude !== 'number' ||
          isNaN(marker.latitude) ||
          isNaN(marker.longitude)
        ) {
          console.warn('Invalid marker coordinates:', marker);
          return;
        }
        
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'marker flex flex-col items-center group';
        
        // Add homeowner name label (always visible, above the dot)
        if (marker.title) {
          const label = document.createElement('div');
          label.textContent = marker.title;
          label.className = 'mb-1 px-2 py-0.5 rounded bg-gray-900 text-white text-xs font-semibold shadow-lg opacity-90 pointer-events-none group-hover:opacity-100';
          markerElement.appendChild(label);
        }
        
        // Marker dot
        const dot = document.createElement('div');
        dot.className = 'relative w-6 h-6 flex items-center justify-center';
        // Pulse effect
        const pulse = document.createElement('div');
        pulse.className = 'absolute w-10 h-10 rounded-full animate-ping opacity-40';
        pulse.style.backgroundColor = marker.color || '#F59E0B';
        dot.appendChild(pulse);
        // Marker dot
        const pin = document.createElement('div');
        pin.className = 'w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10';
        pin.style.backgroundColor = marker.color || '#F59E0B';
        pin.style.border = '2px solid white';
        // Add white inner dot
        const innerDot = document.createElement('div');
        innerDot.className = 'w-2 h-2 rounded-full bg-white';
        pin.appendChild(innerDot);
        dot.appendChild(pin);
        markerElement.appendChild(dot);
        
        // Apply custom class if provided
        if (marker.customClass) {
          markerElement.classList.add(marker.customClass);
        }
        
        // Handle selected marker
        if (selectedMarkerId !== null && String(marker.id) === String(selectedMarkerId)) {
          // Add pulse animation
          const pulse = document.createElement('div');
          pulse.className = 'absolute rounded-full w-10 h-10 animate-ping opacity-30';
          pulse.style.backgroundColor = marker.color || '#4B5563';
          markerElement.appendChild(pulse);
          
          markerElement.classList.add('ring-2', 'ring-blue-500', 'scale-110', 'z-20');
          
          // Fly to selected marker if map reference is still valid
          if (currentMap) {
            try {
              currentMap.flyTo({
                center: [marker.longitude, marker.latitude],
                zoom: Math.max(currentMap.getZoom(), 12),
                essential: true,
              });
            } catch (err) {
              console.warn('Error flying to selected marker:', err);
            }
          }
        }
        
        // Add click handler
        markerElement.addEventListener('click', () => {
          if (marker.onClick) marker.onClick();
          if (onMarkerClick) onMarkerClick(marker.id);
        });
        
        // Create and add marker to map
        const mapboxMarker = new mapboxgl.Marker({
          element: markerElement,
          draggable: false,
        })
          .setLngLat([marker.longitude, marker.latitude]);
        
        // Add popup if title or description exists
        if (marker.title || marker.description) {
          // Create popup with HTML content
          const popupContent = document.createElement('div');
          popupContent.className = 'marker-popup-content';
          
          // Use description as HTML if available (for rich content)
          if (marker.description) {
            popupContent.innerHTML = marker.description;
          } else if (marker.title) {
            // Fallback to simple title if no description
            const titleEl = document.createElement('h3');
            titleEl.classList.add('font-bold', 'text-sm');
            titleEl.textContent = marker.title;
            popupContent.appendChild(titleEl);
          }
          
          // Create and add popup
          const popup = new mapboxgl.Popup({ 
            offset: 25,
            className: 'custom-popup',
            maxWidth: '300px'
          }).setDOMContent(popupContent);
          
          // Run callback when popup opens if provided
          if (marker.popupOpenCallback) {
            popup.on('open', () => {
              marker.popupOpenCallback?.(popupContent);
            });
          }
          
          mapboxMarker.setPopup(popup);
        }  
        
        // Store reference first
        markerRefs.current[String(marker.id)] = mapboxMarker;
        
        // Only add to map if it's still valid
        if (currentMap) {
          try {
            mapboxMarker.addTo(currentMap);
          } catch (err) {
            console.warn('Error adding marker to map:', err);
          }
        }
      } catch (err) {
        console.warn('Error creating marker:', err, marker);
      }
    });
    
    // Fit bounds to all markers if there are any and no marker is selected
    if (markers.length > 0 && selectedMarkerId === null) {
      try {
        const bounds = new mapboxgl.LngLatBounds();
        let hasValidBounds = false;
        
        markers.forEach((marker) => {
          if (
            typeof marker.latitude === 'number' &&
            typeof marker.longitude === 'number' &&
            !isNaN(marker.latitude) &&
            !isNaN(marker.longitude)
          ) {
            bounds.extend([marker.longitude, marker.latitude]);
            hasValidBounds = true;
          }
        });
        
        if (hasValidBounds && currentMap && !bounds.isEmpty()) {
          currentMap.fitBounds(bounds, {
            padding: 50,
            maxZoom: 15,
          });
        }
      } catch (err) {
        console.warn('Error fitting bounds to markers:', err);
      }
    }
  }, [markers, mapReady, onMarkerClick, selectedMarkerId]);

  // Helper function to fit map to all markers
  const fitToMarkers = () => {
    if (!map.current || markers.length === 0) return;
    
    try {
      // Create a local reference to ensure we don't access map after it's removed
      const currentMap = map.current;
      
      const bounds = new mapboxgl.LngLatBounds();
      let hasValidBounds = false;
      
      markers.forEach((marker) => {
        if (
          typeof marker.latitude === 'number' &&
          typeof marker.longitude === 'number' &&
          !isNaN(marker.latitude) &&
          !isNaN(marker.longitude)
        ) {
          bounds.extend([marker.longitude, marker.latitude]);
          hasValidBounds = true;
        }
      });
      
      if (hasValidBounds && currentMap && !bounds.isEmpty()) {
        console.log('MapContainer: Fitting to all markers');
        currentMap.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      }
    } catch (err) {
      console.warn('Error fitting bounds to markers:', err);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-700">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 bg-red-100 bg-opacity-90 flex items-center justify-center z-10 p-4">
            <div className="text-center max-w-md">
              <p className="text-red-800 font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Fit bounds button */}
      {markers.length > 0 && mapReady && (
        <button
          onClick={fitToMarkers}
          className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-3 rounded-md shadow-md flex items-center space-x-1 transition-colors z-10"
          title="Fit to markers"
        >
          <span>Show All Markers</span>
        </button>
      )}
    </div>
  );
};

export default MapContainer;
