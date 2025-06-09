import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProjects, Project } from "../store/projectsSlice";
import MapContainer, { type MapMarker } from "../components/map/MapContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaHardHat,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { IoRefresh, IoFilter } from "react-icons/io5";
import {
  BsBuilding,
  BsGeoAlt,
  BsCalendar,
  BsCurrencyDollar,
  BsPerson,
} from "react-icons/bs";

// Define project statuses and their colors
const PROJECT_STATUS_COLORS: Record<string, string> = {
  not_started: "#9CA3AF", // gray-400
  in_progress: "#3B82F6", // blue-500
  on_hold: "#F59E0B", // amber-500
  completed: "#10B981", // green-500
  cancelled: "#EF4444", // red-500
  default: "#6B7280", // gray-500
};

// Helper function to get tailwind classes for status badge
const getStatusClasses = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "on_hold":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

// List of all project statuses for filtering
const PROJECT_STATUSES = [
  "all",
  "not_started",
  "in_progress",
  "on_hold",
  "completed",
  "cancelled",
];

// Default center for California
const DEFAULT_CENTER: [number, number] = [-119.4179, 36.7783];
const DEFAULT_ZOOM = 6;

// Define the MapMarker interface for type checking
// Using imported MapMarker type from MapContainer

// Helper function to format currency
const formatAmount = (amount?: number): string => {
  if (amount === undefined || amount === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * ProjectDashboard component that displays a map with project locations
 */
const ProjectDashboard: React.FC = () => {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const projectsStatus = useAppSelector((state) => state.projects.status);
  const navigate = useNavigate();

  // Local state - minimized to reduce re-renders
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  // Fetch projects only once on mount
  useEffect(() => {
    // Only fetch if we don't already have projects and aren't already loading
    if (projectsStatus === "idle" && (!projects || projects.length === 0)) {
      dispatch(fetchProjects());
    }
  }, []);

  // Handle manual refresh - only when explicitly requested
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchProjects()).finally(() => setIsRefreshing(false));
  };

  // Handle status filter changes
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  // Filter projects based on status
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (statusFilter === "all") return projects;
    return projects.filter((project) => project.status === statusFilter);
  }, [projects, statusFilter]);

  // Cache for geocoded addresses to avoid redundant API calls
  const geocodeCache = React.useRef<Record<string, [number, number]>>({});
  
  // Function to geocode an address using Mapbox API
  const geocodeAddress = useCallback(async (address: string): Promise<[number, number] | null> => {
    if (!address) return null;
    
    // Check cache first
    const cacheKey = address.toLowerCase().trim();
    if (geocodeCache.current[cacheKey]) {
      return geocodeCache.current[cacheKey];
    }
    
    try {
      // Use Mapbox Geocoding API
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
        {
          params: {
            access_token: process.env.REACT_APP_MAPBOX_TOKEN,
            country: 'US',
            region: 'CA',
            types: 'address,place,postcode,neighborhood',
            limit: 1
          }
        }
      );
      
      if (response.data && response.data.features && response.data.features.length > 0) {
        const [lng, lat] = response.data.features[0].center;
        // Cache the result
        geocodeCache.current[cacheKey] = [lng, lat];
        return [lng, lat];
      }
      console.warn('[Geocode] No features found for address:', address);
      return null;
    } catch (error) {
      console.error('[Geocode] Error for address:', address, error);
      return null;
    }
  }, []);
  
  // Function to generate coordinates with fallback
  const generateCoordinatesFromAddress = async (address: string): Promise<[number, number]> => {
    if (!address) return DEFAULT_CENTER;
    
    // Try to geocode the address
    const coordinates = await geocodeAddress(address);
    if (coordinates) return coordinates;
    
    // Fallback to a simple hash-based approach if geocoding fails
    const hash = address.split('').reduce((acc, char) => {
      return (acc << 5) - acc + char.charCodeAt(0);
    }, 0);
    
    // Southern California bounding box (more restricted area)
    const socalBounds = {
      minLng: -118.7,  // West boundary (further east to focus on populated areas)
      maxLng: -116.8,  // East boundary (further west to avoid desert)
      minLat: 33.5,    // South boundary (north of San Diego)
      maxLat: 34.4     // North boundary (south of Bakersfield)
    };
    
    // Generate coordinates within Southern California bounds
    const lng = socalBounds.minLng + (Math.abs(hash) % (socalBounds.maxLng - socalBounds.minLng));
    const lat = socalBounds.minLat + (Math.abs(hash * 1.5) % (socalBounds.maxLat - socalBounds.minLat));
    
    return [lng, lat];
  };

  // State for markers with coordinates
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  
  // Update markers when filtered projects change
  useEffect(() => {
    const updateMarkers = async () => {
      if (!filteredProjects || !filteredProjects.length) {
        setMarkers([]);
        return;
      }
      
      const newMarkers: MapMarker[] = [];
      
      // Process projects in chunks to avoid overwhelming the geocoding service
      const chunkSize = 5;
      for (let i = 0; i < filteredProjects.length; i += chunkSize) {
        const chunk = filteredProjects.slice(i, i + chunkSize);
        const chunkPromises = chunk.map(async (project) => {
          if (!project.address) return null;
          
          const coordinates = await generateCoordinatesFromAddress(project.address);
          const status = project.status || "pending";
          const projectId = project._id || "";
          const homeowner = project.homeowner || "Unnamed Project";
          const contractAmount = project.contractAmount || 0;
          
          // Format the status for display
          const formattedStatus = status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          // Determine marker color based on status
          const markerColor = status === 'Active' 
            ? '#10B981' // green-500 for Active
            : '#F59E0B'; // yellow-500 for all other statuses
            
          // Format project details for the popup
          const formatDate = (dateString?: string) => {
            if (!dateString) return 'N/A';
            return new Date(dateString).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          };

          const description = `
            <div class="popup-content w-72 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">${homeowner}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }">
                  ${formattedStatus}
                </span>
              </div>
              
              <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                <div class="flex items-start">
                  <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="break-words">${project.address || 'No address available'}</span>
                </div>
                
                ${contractAmount ? `
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="font-medium">${formatAmount(contractAmount)}</span>
                </div>` : ''}
                
                ${project.startDate ? `
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>Start: ${formatDate(project.startDate)}</span>
                </div>` : ''}
                
                ${project.estimatedCompletionDate ? `
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                  </svg>
                  <span>Est. Completion: ${formatDate(project.estimatedCompletionDate)}</span>
                </div>` : ''}
              </div>
              
              <div class="flex space-x-2">
                <a 
                  href="#" 
                  class="flex-1 px-3 py-2 text-center bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded transition-colors shadow-sm"
                  onclick="event.preventDefault(); event.stopPropagation(); window.location.href='/dashboard/projects/${projectId}';"
                >
                  View Details
                </a>
                <button 
                  class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onclick="event.stopPropagation(); this.closest('.mapboxgl-popup')?.remove();"
                  aria-label="Close"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          `;

          return {
            id: projectId,
            latitude: coordinates[1],
            longitude: coordinates[0],
            title: homeowner,
            description: description,
            color: markerColor,
            onClick: () => navigate(`/dashboard/projects/${projectId}`),
          };
        });
        
        const chunkResults = await Promise.all(chunkPromises);
        const validMarkers = chunkResults.filter((marker): marker is NonNullable<typeof marker> => marker !== null);
        
        // Only update if we have valid markers
        if (validMarkers.length > 0) {
          newMarkers.push(...validMarkers);
          // Update markers after each chunk to show progress
          setMarkers(prevMarkers => [...prevMarkers, ...validMarkers]);
        }
      }
    };
    
    updateMarkers();
  }, [filteredProjects, navigate]);

  // Use the markers state in the component
  const generateMapMarkers = useMemo((): MapMarker[] => {
    return markers.map(marker => ({
      ...marker,
      // Ensure id is always a string
      id: String(marker.id),
      // Add a title for the default tooltip
      title: marker.title || 'Project Location'
    }));
  }, [markers]);
  
  // Add custom popup styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup-close-button {
        display: none; /* Hide default close button */
      }
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        pointer-events: auto !important;
      }
      .mapboxgl-popup-tip {
        display: none;
      }
      .mapboxgl-popup {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle project selection
  const handleProjectSelect = (markerId: string | number) => {
    const projectId = markerId.toString();
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
  };

  // Get the selected project details
  const selectedProject = useMemo(() => {
    if (!selectedProjectId || !projects) return null;
    return projects.find((p: Project) => p._id === selectedProjectId);
  }, [selectedProjectId, projects]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Project Locations
          </h1>
          <button
            onClick={handleRefresh}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
            disabled={isRefreshing}
          >
            <FaSyncAlt
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        {/* Main map area */}
        <div className="flex-grow h-full relative">
          {/* Show loading overlay */}
          {projectsStatus === "loading" && !isRefreshing && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-20 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                <p className="text-gray-800 dark:text-gray-200">
                  Loading projects...
                </p>
              </div>
            </div>
          )}

          {/* Show refresh indicator without blocking the map */}
          {isRefreshing && (
            <div className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Debug info (dev only) */}
          {process.env.NODE_ENV !== "production" && (
            <div className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 p-2 rounded shadow-md text-xs max-w-xs overflow-auto opacity-75 hover:opacity-100 transition-opacity">
              <p className="font-bold">Debug Info:</p>
              <p>Projects: {projects?.length || 0}</p>
              <p>Filtered: {filteredProjects.length}</p>
              <p>Markers: {generateMapMarkers.length}</p>
              <p>Selected: {selectedProjectId || "none"}</p>
            </div>
          )}

          {/* Map container */}
          <MapContainer
            markers={generateMapMarkers}
            className="rounded-lg shadow-md h-full w-full"
            selectedMarkerId={selectedProjectId || undefined}
            // Center on California by default if no markers
            center={
              generateMapMarkers?.length > 0 ? undefined : [-119.4179, 36.7783]
            }
            zoom={generateMapMarkers?.length > 0 ? undefined : 5}
            onMarkerClick={handleProjectSelect}
          />

          {/* Error overlay */}
          {projectsStatus === "failed" && !isRefreshing && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50/90 dark:bg-red-900/30 z-20 rounded-lg">
              <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Failed to load project data
                </p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900 rounded text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Map legend */}
          <div className="absolute bottom-2 left-2 z-10 bg-white dark:bg-gray-800 p-2 rounded shadow-md">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  Not Started
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  Pending
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  In Progress
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  Active
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  Completed
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-1"></span>
                <span className="text-gray-600 dark:text-gray-400">
                  Cancelled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project details sidebar */}
        {selectedProject && (
          <div className="w-1/3 max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {selectedProject.homeowner || "Unnamed Project"}
            </h2>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <BsGeoAlt className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedProject.address || "No address provided"}
                  </p>
                </div>
              </div>

              {/* Contract Amount */}
              <div className="flex items-start">
                <BsCurrencyDollar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Contract Amount
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {formatAmount(selectedProject.contractAmount)}
                  </p>
                </div>
              </div>

              {/* Project Type */}
              <div className="flex items-start">
                <FaHardHat className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Project Type
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedProject.products?.[0] || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start">
                <BsCalendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium inline-block mt-1 ${getStatusClasses(selectedProject.status || "default")}`}
                  >
                    {(selectedProject.status || "Not Started").replace(
                      "_",
                      " "
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${selectedProject._id}`)
                }
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded transition-colors"
              >
                View Full Details
              </button>

              <button
                onClick={() => setSelectedProjectId(null)}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
