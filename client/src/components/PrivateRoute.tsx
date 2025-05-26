import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const token = useAppSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}
