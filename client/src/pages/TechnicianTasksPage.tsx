import React, { useState } from "react";
import { Box, Badge, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../store";
import ProjectTimeline from "../components/ProjectTimeline";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

interface Task {
  id: string;
  projectName: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const TechnicianTasksPage: React.FC = () => {
  // In a real app, this would come from an API
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      projectName: "Solar Installation - Smith Residence",
      description: "Complete initial site survey",
      status: "pending",
      dueDate: "2024-03-20",
      priority: "high",
    },
    {
      id: "2",
      projectName: "HVAC Upgrade - Johnson Home",
      description: "Install new AC unit",
      status: "in_progress",
      dueDate: "2024-03-21",
      priority: "medium",
    },
    // Add more dummy tasks as needed
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "in_progress":
        return "blue";
      case "pending":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <PageContainer>
      <PageHeader title="My Tasks" />

      {/* Today's Timeline */}
      <Box className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <ProjectTimeline
          stages={[
            {
              id: "1",
              label: "Site Survey",
              status: "completed",
              date: "9:00 AM",
            },
            {
              id: "2",
              label: "Installation",
              status: "current",
              date: "11:00 AM",
            },
            {
              id: "3",
              label: "Quality Check",
              status: "upcoming",
              date: "2:00 PM",
            },
          ]}
        />
      </Box>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Box
            key={task.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {task.projectName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {task.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge colorScheme={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge colorScheme={getStatusColor(task.status)}>
                  {task.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </PageContainer>
  );
};

export default TechnicianTasksPage;
