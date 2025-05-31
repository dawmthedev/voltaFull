import React from "react";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="sticky top-0 z-10 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 mb-4">
      <div className="glass-panel rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
          {actions && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
