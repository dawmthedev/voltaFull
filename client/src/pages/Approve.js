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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateConfirmationPage = () => {
  const { id } = useParams(); // Assumes the ID is passed via the URL
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    const fieldValue = confirmation.endsWith('1') ? '135' : '165';
    const recordData = {
      to: "your_table_id_here",
      data: [{
        3: { value: id }, // The ID passed in the router
        1456: { value: fieldValue }
      }],
    };

    const response = await axios.post('https://api.quickbase.com/v1/records', recordData, {
      headers: {
        Authorization: "Bearer your_quickbase_user_token_here",
        "QB-Realm-Hostname": "your_quickbase_domain_here",
        "Content-Type": "application/json",
      }
    });

    console.log(response.data);
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
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Confirm Update
        </Button>
      </Grid>

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
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UpdateConfirmationPage;
