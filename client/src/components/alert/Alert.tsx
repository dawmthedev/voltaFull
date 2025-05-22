import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { closeAlert, selectAlert, setAlert } from '../../redux/slice/alertSlice';

export const Alerts = () => {
  const dispatch = useDispatch();
  const { open, type, message } = useAppSelector(selectAlert);
  return (
    <Snackbar
      open={open}
      onClose={() => {
        dispatch(closeAlert());
      }}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={type}
        variant="filled"
        sx={{
          color: 'white',
          fontWeight: 'bold'
        }}
        onClose={() => {
          dispatch(closeAlert());
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
