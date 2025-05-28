import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AppRoutes from "./routes";
import Sidebar from "./components/Sidebar";
import { useAppDispatch } from "./store";
import { fetchCurrentUser } from "./store/authSlice";
import { useAppSelector } from "./store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const token = useAppSelector((state) => state.auth.token);

  return (
    <Router>
      <Box
        ml={
          token &&
          !["/login", "/register", "/"].includes(window.location.pathname)
            ? "220px"
            : "0px"
        }
      >
        {token &&
          !["/login", "/register", "/"].includes(window.location.pathname) && (
            <Sidebar />
          )}
        <AppRoutes />
      </Box>
    </Router>
  );
};

export default App;
