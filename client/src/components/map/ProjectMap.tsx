import React, { useState, useEffect, useMemo } from 'react';
import MapContainer from './MapContainer';
import { Project } from '../../types/task';
import { DEFAULT_CENTER } from '../../config/mapConfig';
import mapboxgl from 'mapbox-gl';

interface ProjectMapProps {
  projects: Project[];
  className?: string;
  onProjectSelect?: (projectId: string) => void;
  selectedProjectId?: string;
}

const ProjectMap: React.FC<ProjectMapProps> = ({
  projects,
  className = 'h-96 w-full rounded-lg',
  onProjectSelect,
  selectedProjectId
}) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  // Generate status color for projects
  const getProjectStatusColor = (status?: string): string => {
    switch (status) {
      case 'not_started':
        return '#9CA3AF'; // gray-400
      case 'in_progress':
        return '#3B82F6'; // blue-500
      case 'on_hold':
        return '#F59E0B'; // amber-500
      case 'completed':
        return '#10B981'; // green-500
      case 'cancelled':
        return '#EF4444'; // red-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  // Generate markers from projects
  useEffect(() => {
    console.log('ProjectMap received:', projects);
    if (!projects || projects.length === 0) {
      console.log('No projects data or empty array');
      setMarkers([]);
      return;
    }
    
    // Filter projects with valid location data
    const projectMarkers = projects
      .filter(project => {
        // Check if project has valid location data
        if (!project.location) {
          console.log('Project missing location:', project._id, project.name);
          return false;
        }
        
        const hasValidLocation = 
          typeof project.location.lat === 'number' && 
          typeof project.location.lng === 'number' && 
          !isNaN(project.location.lat) && 
          !isNaN(project.location.lng);
        
        if (!hasValidLocation) {
          console.log('Filtering out project with invalid location:', project._id, project.name, project.location);
        }
        return hasValidLocation;
      })
      .map(project => ({
        id: project._id || '',
        // Force conversion to number to avoid any string type issues
        latitude: Number(project.location!.lat),
        longitude: Number(project.location!.lng),
        title: project.name,
        description: `
          <strong>${project.name}</strong><br/>
          Status: ${project.status || 'Unknown'}<br/>
          Start Date: ${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}<br/>
          End Date: ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}<br/>
          Client: ${project.client || 'Unknown'}<br/>
          ${project.address ? `Address: ${project.address}` : ''}
        `,
        color: getProjectStatusColor(project.status),
        onClick: () => handleMarkerClick(project._id || '')
      }));
    
    setMarkers(projectMarkers);
  }, [projects]);

  // Handle marker click
  const handleMarkerClick = (projectId: string) => {
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
    
    if (mapInstance && projectId) {
      // Find the marker for this project
      const marker = markers.find(m => m.id === projectId);
      if (marker) {
        // Fly to the project location
        mapInstance.flyTo({
          center: [marker.longitude, marker.latitude],
          zoom: 15,
          essential: true
        });
      }
    }
  };

  // Handle map load to capture the map instance
  const handleMapLoad = (map: mapboxgl.Map) => {
    console.log('Map instance loaded and captured');
    setMapInstance(map);
    
    // If a project is selected, zoom to it
    if (selectedProjectId) {
      setTimeout(() => {
        handleMarkerClick(selectedProjectId);
      }, 500); // Small delay to ensure map is fully loaded
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
        <p className="text-gray-500 dark:text-gray-300">No project data available.</p>
      </div>
    );
  }
  
  // Check for markers specifically
  if (markers.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
        <p className="text-gray-500 dark:text-gray-300">No projects with valid location data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MapContainer
        markers={markers}
        // Use first marker location as center if available, otherwise use default
        center={markers.length > 0 ? [markers[0].longitude, markers[0].latitude] : DEFAULT_CENTER}
        zoom={markers.length > 0 ? 11 : 10}
        className={className}
        selectedMarkerId={selectedProjectId}
        onMapLoad={handleMapLoad}
      />
      <div className="flex flex-wrap items-center gap-4 px-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Legend:</p>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Not Started</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">In Progress</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">On Hold</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;
