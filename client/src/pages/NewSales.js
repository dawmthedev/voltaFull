import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import PayrollData from '../components/dataGrid/PayrollData';
import NewSalelData from '../components/dataGrid/NewSaleData'
import LeadGenPay from '../components/dataGrid/LeadGenPay';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';
import { Fragment } from 'react';

export default function NewSalePage() {
  const { data } = useAppSelector(authSelector);
  const recordId = data?.recordID;
  return (
    <Fragment>
      <Helmet>
        <title>New Sales</title>
      </Helmet>
      <Container>
        <h2>New Sales </h2>
        <Card sx={{ p: '1rem' }}>
          <NewSalelData recordUserId={recordId} />
        </Card>
    
        {/* <h1>Lead generation Commissions</h1>
          <LeadGenPay recordUserId={recordId} /> */}
      </Container>
    </Fragment>
  );
}
