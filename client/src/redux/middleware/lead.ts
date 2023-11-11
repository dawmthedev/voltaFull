import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from '../../libs/client/apiClient';
import { LeadsTypes } from '../../types';

const getLeads = createAsyncThunk('dynamic/get', async ({ categoryId, signal }: { categoryId: string; signal: AbortSignal }) => {
  try {
    const { data } = await get(`/dynamic/${categoryId}`, { signal });
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

const createLead = createAsyncThunk('dynamic/insert', async ({ lead, signal }: { lead: any; signal: AbortSignal }) => {
  try {
    const { data } = await post('/dynamic/insert', lead);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const createBulkLead = createAsyncThunk(
  'dynamic/createBulk',
  async ({ leads, signal }: { leads: CreateBulkLeadsType; signal: AbortSignal }) => {
    try {
      const { data } = await post('/dynamic/createBulk', { ...leads });
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateLead = createAsyncThunk('lead/update', async ({ lead, signal }: { lead: any; signal: AbortSignal }) => {
  try {
    const { data } = await put('/dynamic/update', lead);
    return data.data;
  } catch (error) {
    throw error;
  }
});

const deleteLead = createAsyncThunk('lead/delete', async ({ id, tableId }: { id: string; tableId: string }) => {
  try {
    const { data } = await post(`/dynamic/delete/${id}`, {tableId});
    return data.data;
  } catch (error) {
    throw error;
  }
});

export { getLeads, getLead, createLead, createBulkLead, updateLead, deleteLead };

type FieldTypes = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
};

type CreateBulkLeadsType = {
  tableName: string;
  fields: FieldTypes[];
  data: any;
};
