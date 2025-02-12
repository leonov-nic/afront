import { useState, useCallback } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { CustomButton } from '../common/button/button';
import DialogAddToStorage from '../dialog-add-to-storage/dialog-add-to-storage';
import { getUserStatus } from '../../store/user-process/user-process';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function ButtonOpenDialogAddToStorage() {
  const [open, setOpen] = useState(false);
  const userStatus = useAppSelector(getUserStatus);
  

  const handleOpenDialog = () => {
    setOpen(!open)
  }

  const handleCloseDialog = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    userStatus === 'admin' && 
    <>
      <CustomButton
        data-name='storage'
        sx={{ backgroundColor: "#17c1bc", boxShadow: "none", px: 3, py: 1, minWidth: "57px", mx: 1, borderRadius: "7px" }}
        onClick={handleOpenDialog}
      >
        <AddTaskIcon fontSize='large'/>
      </CustomButton>
      <DialogAddToStorage open={open} onClose={handleCloseDialog} />
    </>
  );
}
