// Map configuration settings
console.log("Loading map config...");
console.log("Environment variables:", {
  REACT_APP_MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN
    ? "Set"
    : "Not set",
  NODE_ENV: process.env.NODE_ENV,
});

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGF3bXRoZWRldiIsImEiOiJjbWJmcG5nZHUwMGdpMmxweTF0eGhoY3FqIn0.Kiu_883HQPYPC9Bf6ZnYcQ"; // Public Mapbox token for demo purposes

export const getMapboxToken = () => {
  // First try to get token from environment variable
  const envToken = process.env.REACT_APP_MAPBOX_TOKEN;
  console.log(
    "Getting Mapbox token. From env:",
    !!envToken,
    "Using demo token:",
    !envToken
  );

  if (envToken) return envToken;

  // Fall back to the demo token if environment variable isn't set
  // Note: In production, you should always use an environment variable
  console.warn(
    "Using demo Mapbox token. Set REACT_APP_MAPBOX_TOKEN in .env for production use."
  );
  return MAPBOX_TOKEN;
};

export const DEFAULT_CENTER: [number, number] = [-97.7431, 30.2672]; // Austin, TX
export const DEFAULT_ZOOM = 10;
