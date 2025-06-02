import React, { useState } from "react";
import { useAppSelector } from "../store";

const UserAvatar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!user) return <p className="text-sm">Loading...</p>;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute right-0 bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {`${user.name} (${user.role})`}
          <div className="absolute top-full right-4 -mt-1 border-solid border-x-transparent border-x-4 border-t-4 border-t-gray-800"></div>
        </div>
      )}
      <div className="flex items-center px-2 gap-2">
        <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=voltauser"
              alt={user.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="leading-tight hidden md:block">
          <p className="text-sm font-semibold">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
