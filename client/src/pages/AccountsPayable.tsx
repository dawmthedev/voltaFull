import { Helmet } from 'react-helmet-async';
import { Card, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export default function AccountsPayable() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Accounts Payable</title>
      </Helmet>
      <Container>
        <h2>Accounts Payable</h2>
        <Card sx={{ p: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Container>
    </React.Fragment>
  );
}
