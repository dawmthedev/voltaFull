import { Box } from '@mui/material';
import React from 'react';
import CustomInput from '../input/CustomInput';

interface PlannerProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialState = {
  title: '',
  description: '',
  timeOfExecution: ''
};

const PlannerForm = () => {
  const [state, setState] = React.useState(initialState);
  return (
    <Box>
      <CustomInput
        label="Title"
        name={state.title}
        onChange={(e) =>
          setState({
            ...state,
            title: e.target.value
          })
        }
        value={state.title}
      />
      <CustomInput
        label="Description"
        name={state.description}
        onChange={(e) =>
          setState({
            ...state,
            description: e.target.value
          })
        }
        value={state.description}
      />
    </Box>
  );
};

export default PlannerForm;
