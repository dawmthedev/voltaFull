import React, { useState, useEffect, useMemo, useCallback, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchUsers } from "../store/usersSlice";
import TechnicianMap from "../components/map/TechnicianMap";
import { IoLocation, IoFilter, IoRefresh, IoList, IoGrid, IoSearch, IoClose } from "react-icons/io5";
import { TechnicianStatus } from "../types/task";

// Define mock locations around Los Angeles for demonstration
const MOCK_LOCATIONS = [
  { lat: 34.0522, lng: -118.2437 }, // Downtown LA
  { lat: 34.0211, lng: -118.4814 }, // Santa Monica
  { lat: 34.0825, lng: -118.3709 }, // Hollywood
  { lat: 34.1478, lng: -118.1445 }, // Pasadena
  { lat: 33.9416, lng: -118.4085 }, // LAX area
  { lat: 34.0741, lng: -118.2415 }, // Echo Park
  { lat: 34.0194, lng: -118.4912 }, // Venice Beach
  { lat: 33.9561, lng: -118.3920 }, // Inglewood
  { lat: 34.1069, lng: -118.3287 }, // Universal Studios
  { lat: 34.0505, lng: -118.3078 }, // Koreatown
];

const TechnicianDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);
  const usersStatus = useAppSelector((state) => state.users.status);
  
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<TechnicianStatus | "all">("all");
  const [showMapView, setShowMapView] = useState(true); // Toggle between map and list view
  const [searchQuery, setSearchQuery] = useState(""); // Search functionality
  const [showFilters, setShowFilters] = useState(false);

  // Define all possible technician statuses
  const allStatuses: (TechnicianStatus | "all")[] = [
    "all", "available", "assigned", "on_break", "unavailable"
  ];

  // Only fetch initially on component mount, not on every state change
  useEffect(() => {
    // Only fetch if we haven't already done so
    if (usersStatus === "idle" && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus, users.length]); // Added users.length to dependencies

  // Add mock location data for demo purposes - using useMemo to ensure stability
  const technicians = useMemo(() => {
    console.log('Creating stable technician data from users:', users.length);
    
    // Ensure we have at least some mock technicians regardless of API response
    if (users.length === 0) {
      console.log('No users found, creating fallback mock technicians');
      // Generate 5 mock technicians with random locations
      return Array(5).fill(null).map((_, index) => {
        const statuses: TechnicianStatus[] = ["available", "assigned", "on_break", "unavailable"];
        const mockLocation = MOCK_LOCATIONS[index % MOCK_LOCATIONS.length];
        
        return {
          id: `mock-tech-${index}`,
          name: `Technician ${index + 1}`,
          role: "Technician",
          skills: [],
          contact: { phone: "", email: `tech${index+1}@volta.com` },
          status: statuses[index % statuses.length],
          currentLocation: {
            lat: mockLocation.lat,
            lng: mockLocation.lng,
            lastUpdated: new Date(),
          },
        };
      });
    }
    
    // If we have actual users, process them
    return users
      .filter((user) => user.role === "Technician")
      .map((tech, index) => {
        // Deterministically assign a status based on user ID to prevent flipping
        const statuses: TechnicianStatus[] = [
          "available",
          "assigned",
          "on_break",
          "unavailable",
        ];
        // Use a hash of the ID to get consistent status for each technician
        const statusIndex = tech._id ? 
          tech._id.charCodeAt(0) % statuses.length : 
          index % statuses.length;
        const status = statuses[statusIndex];

        // Assign a mock location - slightly randomized but stable
        const baseLocation = MOCK_LOCATIONS[index % MOCK_LOCATIONS.length];
        // Create a stable random offset based on user ID
        const idSeed = tech._id ? 
          (tech._id.charCodeAt(0) + (tech._id.charCodeAt(1) || 0)) / 1000 : 
          index / 1000;
        
        const locationOffset = {
          lat: (idSeed * 0.01) - 0.005, // +/- 0.005 degrees (about 500m)
          lng: (idSeed * 0.02) - 0.01   // +/- 0.01 degrees (about 1km)
        };
        
        return {
          id: tech._id || `tech-${index}`,
          name: tech.name,
          role: tech.role,
          skills: [], 
          contact: {
            phone: tech.phone || "",
            email: tech.email || "",
          },
          status: status,
          currentLocation: {
            lat: baseLocation.lat + locationOffset.lat,
            lng: baseLocation.lng + locationOffset.lng,
            lastUpdated: new Date(Date.now() - (Math.abs(idSeed) * 3600000) % 3600000), // Stable time within the last hour
          },
        };
      });
  }, [users]); // Only recalculate when users change

  // Filter technicians based on status filter and search query
  const filteredTechnicians = useMemo(() => {
    return technicians.filter(tech => {
      // Apply status filter
      const statusMatch = statusFilter === "all" || tech.status === statusFilter;
      
      // Apply search filter if there's a query
      if (searchQuery.trim() === "") {
        return statusMatch;
      }
      
      // Search across multiple fields
      const query = searchQuery.toLowerCase();
      const nameMatch = tech.name?.toLowerCase().includes(query) || false;
      const emailMatch = tech.contact?.email?.toLowerCase().includes(query) || false;
      const phoneMatch = tech.contact?.phone?.toLowerCase().includes(query) || false;
      const roleMatch = tech.role?.toLowerCase().includes(query) || false;
      
      return statusMatch && (nameMatch || emailMatch || phoneMatch || roleMatch);
    });
  }, [technicians, statusFilter, searchQuery]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => {
        console.log('Successfully refreshed technician data');
      })
      .catch(error => {
        console.error('Error refreshing technician data:', error);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const handleTechnicianSelect = (techId: string) => {
    setSelectedTechnicianId(techId === selectedTechnicianId ? undefined : techId);
  };

  const handleStatusFilter = (status: TechnicianStatus | "all") => {
    setStatusFilter(status);
  };

  // Helper function to get color for technician status
  const getTechnicianStatusColor = (status?: string) => {
    switch (status) {
      case "available":
        return "bg-teal-500";
      case "assigned":
        return "bg-blue-500";
      case "on_break":
        return "bg-amber-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getTechnicianStatusText = (status?: string) => {
    switch (status) {
      case "available":
        return "text-teal-500";
      case "assigned":
        return "text-blue-500";
      case "on_break":
        return "text-amber-500";
      case "unavailable":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Format last seen time more human-friendly
  const formatLastSeen = useCallback((date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 5) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }, []);

  // Handle search keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F or Cmd+F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        setShowFilters(true);
        const searchInput = document.getElementById('technicianSearch');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Technician Dashboard
          </h1>
          <div className="flex flex-wrap gap-2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex items-center">
              <button
                onClick={() => setShowMapView(true)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${showMapView 
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <IoLocation className="inline mr-1" /> Map View
              </button>
              <button
                onClick={() => setShowMapView(false)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${!showMapView 
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                List View
              </button>
            </div>
            <button
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isRefreshing ? 'bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
              onClick={handleRefresh}
              disabled={isRefreshing || usersStatus === 'loading'}
            >
              <IoRefresh className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
            >
              <IoFilter className="mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full md:w-auto flex flex-col gap-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</div>
                <div className="flex flex-wrap gap-2">
                  {allStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                        statusFilter === status
                          ? status === 'all' ? 'bg-gray-600 text-white' :
                            status === 'available' ? 'bg-teal-500 text-white' :
                            status === 'assigned' ? 'bg-blue-500 text-white' :
                            status === 'on_break' ? 'bg-amber-500 text-white' :
                            'bg-red-500 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-64">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search technicians:</div>
                <div className="relative">
                  <input
                    id="technicianSearch" /* ID needed for keyboard shortcut focus */
                    type="text"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email..."
                    className="w-full px-3 py-2 pl-10 pr-10 rounded-md border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                              focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 
                              placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                  />
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 
                                dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-0.5"
                    >
                      <IoClose />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Found {filteredTechnicians.length} matching technicians
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`${showMapView ? 'lg:col-span-1' : 'lg:col-span-4'} overflow-hidden`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-between">
                <span>Technician List</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {filteredTechnicians.length} technicians
                </span>
              </h2>
              
              {usersStatus === 'loading' ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              ) : usersStatus === 'failed' ? (
                <div className="text-center py-8 text-red-500">
                  Failed to load technicians. Please try again.
                </div>
              ) : filteredTechnicians.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No technicians match the selected filters.
                </div>
              ) : (
                <div className={`space-y-4 overflow-auto ${showMapView ? 'max-h-[calc(100vh-300px)]' : 'max-h-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'} scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scroll-smooth`}>
                  {filteredTechnicians.map((tech) => (
                    <div 
                      key={tech.id} 
                      className={`border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm ${
                        tech.id === selectedTechnicianId ? "bg-gray-50 dark:bg-gray-700/50 border-teal-500 dark:border-teal-500 ring-1 ring-teal-500" : ""
                      }`}
                      onClick={() => handleTechnicianSelect(tech.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200 text-base">{tech.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{tech.contact?.email || 'No email'}</div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getTechnicianStatusColor(tech.status)}`}></div>
                          <div className={`text-xs font-medium ${getTechnicianStatusText(tech.status)}`}>
                            {tech.status?.replace('_', ' ') || 'Unknown'}
                          </div>
                        </div>
                      </div>
                      
                      {tech.currentLocation && (
                        <div className="mt-2.5 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <IoLocation className="mr-1 text-gray-400" />
                          Last seen: {formatLastSeen(new Date(tech.currentLocation.lastUpdated))}
                        </div>
                      )}
                      
                      {tech.id === selectedTechnicianId && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Travel History:</div>
                          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                              <span>Today, 9:00 AM - Downtown LA</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                              <span>Today, 11:30 AM - Hollywood</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                              <span>Today, 2:15 PM - Current Location</span>
                            </div>
                          </div>
                          <button
                            className="mt-3 w-full py-1.5 px-3 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMapView(true);
                            }}
                          >
                            View on Map
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {showMapView && (
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    Technician Locations
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="mr-4">Displaying {filteredTechnicians.length} technicians</span>
                    <button 
                      className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                      onClick={() => {
                        // Find all technicians with locations and fit map bounds to them
                        if (filteredTechnicians.length > 0) {
                          // This is handled in the TechnicianMap component
                          // Just refresh to trigger a re-render
                          handleRefresh();
                        }
                      }}
                    >
                      <IoRefresh className="inline mr-1" /> Fit to View
                    </button>
                  </div>
                </div>
              
              {usersStatus === 'loading' && (
                <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Loading technician data...</p>
                  </div>
                </div>
              )}
              
              {usersStatus === 'failed' && (
                <div className="h-[600px] w-full flex items-center justify-center bg-red-50 dark:bg-red-900/20">
                  <p className="text-red-600 dark:text-red-400">Failed to load technician data. Please try again.</p>
                </div>
              )}
              
              {usersStatus !== 'loading' && usersStatus !== 'failed' && (
                <div className="h-[600px] w-full relative">
                  {/* Debug info - will be removed in production */}
                  {process.env.NODE_ENV !== 'production' && (
                    <div className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 p-2 rounded shadow-md text-xs max-w-xs overflow-auto opacity-75 hover:opacity-100 transition-opacity">
                      <p className="font-bold">Debug Info:</p>
                      <p>Technicians: {technicians.length}</p>
                      <p>Filtered: {filteredTechnicians.length}</p>
                      <p>Selected: {selectedTechnicianId || 'none'}</p>
                    </div>
                  )}
                  <TechnicianMap 
                    technicians={filteredTechnicians}
                    onTechnicianSelect={handleTechnicianSelect}
                    selectedTechnicianId={selectedTechnicianId}
                    className="h-full w-full"
                  />
                </div>
              )}
              
              {selectedTechnicianId && (
                <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  {(() => {
                    const tech = filteredTechnicians.find(t => t.id === selectedTechnicianId);
                    if (!tech) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-white text-lg">{tech.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{tech.role || 'Technician'}</p>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${getTechnicianStatusColor(tech.status)}`}></div>
                            <span className={`text-sm font-medium ${getTechnicianStatusText(tech.status)}`}>
                              {tech.status?.replace('_', ' ') || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 w-24">Contact:</span>
                            <span className="text-gray-800 dark:text-gray-200">{tech.contact?.phone || 'N/A'}</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 w-24">Email:</span>
                            <span className="text-gray-800 dark:text-gray-200">{tech.contact?.email || 'N/A'}</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-gray-500 dark:text-gray-400 w-24">Last seen:</span>
                            <span className="text-gray-800 dark:text-gray-200">
                              {tech.currentLocation ? formatLastSeen(new Date(tech.currentLocation.lastUpdated)) : 'Unknown'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-end space-x-2">
                          <button 
                            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors font-medium"
                            onClick={() => setSelectedTechnicianId(undefined)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    );
                  })()} 
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
