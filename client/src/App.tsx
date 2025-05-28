import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchCurrentUser } from "./store/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (status === 'loading') return null;

  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
};

export default App;
