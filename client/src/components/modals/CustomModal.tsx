import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import * as React from 'react';

interface CustomModalProps {
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: () => void;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomModal = ({ title, open, setOpen, handleSubmit, setIsEdit, size = 'sm', children, loading }: CustomModalProps) => {
  const handleClose = () => {
    setOpen(false);
    setIsEdit && setIsEdit(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={size}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        {title && (
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            {loading ? (
              <Button autoFocus>
                <CircularProgress size="14px" sx={{ color: '#0F52BA' }} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} autoFocus>
                Submit
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};
export default CustomModal;
