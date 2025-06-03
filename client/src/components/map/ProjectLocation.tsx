import React from 'react';
import MapContainer from './MapContainer';
import { Project } from '../../types/task';

interface ProjectLocationProps {
  project: Project;
  className?: string;
}

const ProjectLocation: React.FC<ProjectLocationProps> = ({ project, className = 'h-64 w-full rounded-lg' }) => {
  if (!project.latitude || !project.longitude) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
        <p className="text-gray-500 dark:text-gray-300">Location data not available for this project.</p>
      </div>
    );
  }

  const marker = {
    id: project._id || project.id || `project-${Date.now()}`, // Ensure id is never undefined
    longitude: project.longitude as number,
    latitude: project.latitude as number,
    title: project.name,
    color: '#3B82F6', // Default blue, or derive from project status if needed
    description: project.address,
  };

  return (
    <MapContainer
      markers={[marker]}
      center={[project.longitude, project.latitude]}
      zoom={14} // Zoom in a bit more for a single project
      className={className}
      showDirectionsButton={true} // Optionally show directions for a single project view
    />
  );
};

export default ProjectLocation;
