import React, { useState, useEffect } from 'react';
import MapContainer from '../components/map/MapContainer'; // Adjusted path
import { Project } from '../types/task';
// Assuming an API slice for fetching projects, e.g., from '../store/projectsApi';
// For now, we'll use mock data.

// Helper to determine marker color based on status
const getMarkerColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'in_progress':
    case 'completed': // Or a different color for completed
      return '#10B981'; // Tailwind's teal-500
    case 'on_hold':
    case 'pending':
      return '#F59E0B'; // Tailwind's amber-500
    case 'cancelled':
    case 'error':
      return '#EF4444'; // Tailwind's red-500
    default:
      return '#6B7280'; // Tailwind's gray-500
  }
};

const MapDashboard: React.FC = () => {
  // const { data: projects = [], isLoading, error } = useGetProjectsQuery(); // Ideal RTK Query usage
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching projects data
    // Replace with actual API call
    const mockProjectsData: Project[] = [
      {
        id: '1',
        name: 'Project Alpha (Solar)',
        address: '123 Main St, Los Angeles, CA 90001',
        latitude: 34.0522,
        longitude: -118.2437,
        status: 'Active',
        homeownerName: 'John Doe',
        projectType: 'Solar',
      },
      {
        id: '2',
        name: 'Project Bravo (HVAC)',
        address: '456 Oak Ave, San Francisco, CA 94102',
        latitude: 37.7749,
        longitude: -122.4194,
        status: 'Pending',
        homeownerName: 'Jane Smith',
        projectType: 'HVAC',
      },
      {
        id: '3',
        name: 'Project Charlie (MPU)',
        address: '789 Pine Ln, San Diego, CA 92101',
        latitude: 32.7157,
        longitude: -117.1611,
        status: 'On Hold',
        homeownerName: 'Mike Brown',
        projectType: 'MPU',
      },
      // Add more mock projects with latitude and longitude
    ];
    setTimeout(() => {
      setProjects(mockProjectsData.filter(p => p.latitude && p.longitude));
      setIsLoading(false);
    }, 1000);
  }, []);

  const mapMarkers = projects.map(project => ({
    id: project._id || project.id || `project-${Date.now()}`, // Ensure id is never undefined
    longitude: project.longitude!,
    latitude: project.latitude!,
    title: project.name,
    description: `Status: ${project.status}<br>Address: ${project.address}`,
    color: getMarkerColor(project.status || ''),
    onClick: () => setSelectedProjectId(project._id || project.id || ''),
  }));

  const selectedProjectDetails = projects.find(p => (p._id || p.id) === selectedProjectId);

  if (isLoading) {
    return <div className="p-4">Loading map and project data...</div>;
  }

  // if (error) {
  //   return <div className="p-4 text-red-500">Error loading projects: {JSON.stringify(error)}</div>;
  // }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Projects Map Dashboard</h1>
      </header>
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <div className="flex-grow h-full relative">
          <MapContainer 
            markers={mapMarkers} 
            className="rounded-lg shadow-md h-full w-full" 
            selectedMarkerId={selectedProjectId || undefined}
            // Center on California by default if no markers, or let MapContainer handle default
            center={projects.length > 0 ? undefined : [-119.4179, 36.7783]} 
            zoom={projects.length > 0 ? undefined : 5}
          />
        </div>
        {selectedProjectDetails && (
          <div className="w-1/3 max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{selectedProjectDetails.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong>Address:</strong> {selectedProjectDetails.address}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong>Status:</strong> 
              <span style={{ color: getMarkerColor(selectedProjectDetails.status) }}>
                {selectedProjectDetails.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong>Homeowner:</strong> {selectedProjectDetails.homeownerName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3"><strong>Type:</strong> {selectedProjectDetails.projectType}</p>
            
            {/* Add more project details here */}
            <button 
              onClick={() => setSelectedProjectId(null)} 
              className="mt-4 w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapDashboard;
