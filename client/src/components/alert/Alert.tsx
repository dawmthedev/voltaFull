import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
  error: string;
  success: string;
}

export default function ErrorAlert({ error, success }: Props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {(error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )) ||
        ''}

      {(success && (
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      )) ||
        ''}
    </Stack>
  );
}
