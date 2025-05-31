import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

interface TimelineStage {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

interface ProjectTimelineProps {
  stages: TimelineStage[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ stages }) => {
  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700 top-5" />

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col items-center">
              {/* Stage marker */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
                  ${
                    stage.status === "completed"
                      ? "bg-green-500"
                      : stage.status === "current"
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                  }
                  text-white`}
              >
                {stage.status === "completed" ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : stage.status === "current" ? (
                  <ArrowPathIcon className="w-6 h-6 animate-spin" />
                ) : (
                  <ClockIcon className="w-6 h-6" />
                )}
              </div>

              {/* Stage label */}
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {stage.label}
                </div>
                {stage.date && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stage.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
