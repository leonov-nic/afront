import { useState } from 'react';
import { CustomButton } from '../common/button/button';
import DialogAddToStorage from '../dialog-add-to-storage/dialog-add-to-storage';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ButtonOpenDialogDeleteFromStorage() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(!open)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <CustomButton
        data-name='storage'
        sx={{ backgroundColor: "red", boxShadow: "none", px: 3, py: 1, minWidth: "57px", mx: 1 }}
        onClick={handleOpenDialog}
      >
        <RemoveCircleOutlineIcon />
      </CustomButton>
      <DialogAddToStorage open={open} onClose={handleCloseDialog} />
    </>
  );
}
