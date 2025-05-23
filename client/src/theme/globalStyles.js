import React from 'react';
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

export default function GlobalStyles() {
  return (
    <MUIGlobalStyles
      styles={{
        '*': { boxSizing: 'border-box' },
        html: { margin: 0, padding: 0, width: '100%', height: '100%', WebkitOverflowScrolling: 'touch' },
        body: { margin: 0, padding: 0, width: '100%', height: '100%' },
        '#root': { minHeight: '100%' },
        img: { display: 'block', maxWidth: '100%' },
        ul: { margin: 0, padding: 0 },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
            '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' },
          },
        },
      }}
    />
  );
}
