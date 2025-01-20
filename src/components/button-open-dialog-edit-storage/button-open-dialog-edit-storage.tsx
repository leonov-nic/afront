import { useState, useCallback } from 'react';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

import { CustomButton } from '../common/button/button';
import DialogEditStorage from '../dialog-edit-storage/dialog-edit-storage';
import { getUserStatus } from '../../store/user-process/user-process';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function ButtonOpenDialogEditStorage() {
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
        sx={{ backgroundColor: "#f1c40f", boxShadow: "none", px: 3, py: 1, minWidth: "57px", mx: 1, borderRadius: "7px" }}
        onClick={handleOpenDialog}
      >
        <FlipCameraAndroidIcon fontSize='large'/>
      </CustomButton>
      <DialogEditStorage open={open} onClose={handleCloseDialog} />
    </>
  );
}
