import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';
import { LeadsTypes } from '../../types';

const getLeads = createAsyncThunk('leads/get', async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { data } = await get('/lead', { signal });
    return data.data;
  } catch (error) {
    throw error;
  }
});

const getLead = createAsyncThunk('lead/get', async ({ id }: { id: string }) => {
  try {
    const { data } = await get(`/lead/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createLead = createAsyncThunk('lead/create', async ({ lead, signal }: { lead: LeadsTypes; signal: AbortSignal }) => {
  try {
    const { data } = await post('/lead', lead);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createBulkLead = createAsyncThunk('lead/createBulk', async ({ leads, signal }: { leads: LeadsTypes[]; signal: AbortSignal }) => {
  try {
    const { data } = await post('/lead/bulk', leads);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const updateLead = createAsyncThunk('lead/update', async ({ lead, signal }: { lead: LeadsTypes; signal: AbortSignal }) => {
  try {
    const { data } = await put('/lead', lead);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const deleteLead = createAsyncThunk('lead/delete', async ({ id }: { id: string }) => {
  try {
    const { data } = await destroy(`/lead/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export { getLeads, getLead, createLead, createBulkLead, updateLead, deleteLead };
