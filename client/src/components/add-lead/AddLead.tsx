import React from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import { categorySelector } from '../../redux/slice/categorySlice';
import { CategoryResponseTypes, FieldTypes } from '../../types';
import CustomInput from '../input/CustomInput';

interface AddLeadProps {
  leadValue: {
    name: string;
    type: string;
    value: string;
  }[];
  getAddLeadData: (value: string, name: string, index: number) => void;
}

export const leadsInitialState = {
  fieldName: '',
  type: '',
  value: ''
};

const AddLead = ({ leadValue, getAddLeadData }: AddLeadProps) => {
  //   const categories: CategoryResponseTypes[] = useAppSelector(categorySelector);

  return (
    <Grid>
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => {
            addNewLead();
          }}
        >
          + New Field
        </Button>
      </Box> */}

      {leadValue?.map((lead, index) => (
        <Box key={index}>
          <CustomInput
            label={lead.name}
            name={lead.name}
            value={lead.value}
            onChange={(e) => {
              getAddLeadData(e.target.value, e.target.name, index);
            }}
          />

          {/* <Grid item xs={4}>
            <CustomInput
              label="Type"
              name="type"
              value={lead.type}
              onChange={(e) => {
                  getAddLeadData(e.target.value, e.target.name, index);
                }}
                />
                </Grid>
                <Grid item xs={4}>
                <CustomInput
                label="Value"
                name="value"
                value={lead.value}
                onChange={(e) => {
                    getAddLeadData(e.target.value, e.target.name, index);
                }}
                />
            </Grid> */}
        </Box>
      ))}
      {/* <FormControl fullWidth sx={{ mt: '.8rem' }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label="Select Category"
          onChange={(e: SelectChangeEvent) => {
            setSelectedCategory(e.target.value);
          }}
        >
          {categories.map((category: CategoryResponseTypes) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </Grid>
  );
};

export default AddLead;
