import { createSlice } from '@reduxjs/toolkit';
import { CategoryResponseTypes } from '../../types';

const initialState: { data: CategoryResponseTypes[] } = {
  data: []
};
