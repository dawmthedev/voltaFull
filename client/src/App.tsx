import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';
import { useAppDispatch } from './store';
import { fetchCurrentUser } from './store/authSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Sidebar />
      <Box ml="220px">
        <AppRoutes />
      </Box>
    </Router>
  );
};

export default App;
