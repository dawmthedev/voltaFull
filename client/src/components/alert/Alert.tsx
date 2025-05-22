import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export interface AlertProps {
  open: boolean;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ open, message, type = 'info', onClose }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <MuiAlert severity={type} variant="filled" onClose={onClose} sx={{ color: 'white', fontWeight: 'bold' }}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default AlertComponent;
