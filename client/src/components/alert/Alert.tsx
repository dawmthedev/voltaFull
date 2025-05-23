import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface AlertProps {
  open: boolean;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ open, message, type = 'info', onClose }) => (
  <Collapse in={open} style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1400 }}>
    <Alert
      severity={type}
      variant="filled"
      sx={{ borderRadius: '4px', color: 'white', position: 'relative' }}
    >
      {message}
      {onClose && (
        <IconButton
          aria-label="close"
          size="small"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'inherit' }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
    </Alert>
  </Collapse>
);

export default AlertComponent;
