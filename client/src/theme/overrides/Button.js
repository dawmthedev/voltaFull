
// ----------------------------------------------------------------------
export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
            backgroundColor: theme.palette.grey[400],
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
            backgroundColor: theme.palette.action.hover,
        textInherit: {
      },
    },
  };
}
