import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../libs/client/apiClient';

const UpdateConfirmationPage = () => {
  const { id } = useParams(); // Assumes the ID is passed via the URL
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = async () => {
    const fieldValue = confirmation.endsWith('1') ? '135' : '165';
    const recordData = {
      id,
      value: fieldValue
    };
    handleClose(); // Close the dialog after updating
  };
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <TextField
          label="Enter Code"
          variant="outlined"
          fullWidth
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
      </Grid>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Confirm Update
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Your Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update the record with this information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Confirm
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default UpdateConfirmationPage;
