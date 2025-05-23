import React from 'react';
import { Alert, AlertIcon, Collapse, CloseButton } from '@chakra-ui/react';

export interface AlertProps {
  open: boolean;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ open, message, type = 'info', onClose }) => (
  <Collapse in={open} style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1400 }}>
    <Alert status={type} variant="solid" borderRadius="md" color="white">
      <AlertIcon />
      {message}
      {onClose && <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />}
    </Alert>
  </Collapse>
);

export default AlertComponent;
