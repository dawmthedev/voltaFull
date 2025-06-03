import React, { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchUsers } from "../store/usersSlice";
import TechnicianMap from "../components/map/TechnicianMap";
import { IoLocation, IoFilter, IoRefresh } from "react-icons/io5";
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

  const filteredTechnicians = technicians.filter(
    (tech) => statusFilter === "all" || tech.status === statusFilter
  );

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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Technician Dashboard
          </h1>
          <div className="flex space-x-2">
            <button
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isRefreshing ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
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
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">Filter by status:</div>
              <div className="flex flex-wrap gap-2">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      statusFilter === status
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                Technician List
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
                <div className="space-y-4 overflow-auto max-h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scroll-smooth">
                  {filteredTechnicians.map((tech) => (
                    <div 
                      key={tech.id} 
                      className={`border dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        tech.id === selectedTechnicianId ? "bg-gray-50 dark:bg-gray-700/50 border-teal-500 dark:border-teal-500" : ""
                      }`}
                      onClick={() => handleTechnicianSelect(tech.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">{tech.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{tech.contact?.email || 'No email'}</div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getTechnicianStatusColor(tech.status)}`}></div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {tech.status?.replace('_', ' ') || 'Unknown'}
                          </div>
                        </div>
                      </div>
                      
                      {tech.currentLocation && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <IoLocation className="mr-1" />
                          Last seen: {new Date(tech.currentLocation.lastUpdated).toLocaleTimeString()}
                        </div>
                      )}
                      
                      {tech.id === selectedTechnicianId && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Travel History:</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                              <span>Today, 9:00 AM - Downtown LA</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                              <span>Today, 11:30 AM - Hollywood</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                              <span>Today, 2:15 PM - Current Location</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                  Technician Locations
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Displaying {filteredTechnicians.length} technicians
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
