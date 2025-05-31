import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="section-container">
        <div
          className={`max-w-screen-xl mx-auto space-y-6 animate-fade-in ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
