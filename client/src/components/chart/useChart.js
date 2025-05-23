import merge from 'lodash/merge';
import { useTheme, alpha } from '@mui/material/styles';

export default function useChart(options = {}) {
  const theme = useTheme();

  const baseOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.palette?.text?.disabled,
      fontFamily: theme.typography?.fontFamily,
    },
    stroke: { width: 3, curve: 'smooth', lineCap: 'round' },
    fill: { type: 'solid' },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 3, borderColor: theme.palette?.divider },
    tooltip: { theme: 'light' },
    legend: { show: true, position: 'top', horizontalAlign: 'right' },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: '28%' },
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: alpha(theme.palette?.grey?.[500] || '#000', 0.16),
        },
      },
    },
    colors: [
      theme.palette?.primary?.main,
      theme.palette?.warning?.main,
      theme.palette?.info?.main,
      theme.palette?.error?.main,
      theme.palette?.success?.main,
    ],
  };

  return merge({}, baseOptions, options);
}
