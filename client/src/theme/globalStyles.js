import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
// @mui

// ----------------------------------------------------------------------
export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        body: {
        '#root': {
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
          },
        img: {
          display: 'block',
          maxWidth: '100%',
        ul: {
      }}
    />
  );
  return inputGlobalStyles;
}
