import * as S from './but-add-detail.styled';
import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DialogAddDetail from '../dialog-add-detail/dialog-add-detail';

import { getUserStatus } from '../../store/user-process/user-process';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function ButtonOpenDialogAddDetail() {
  const userStatus = useAppSelector(getUserStatus);
  console.log(userStatus);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(!open)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    userStatus === 'admin' && 
    <>
      <CustomButton
        data-name='111'
        sx={{ backgroundColor: "#17c1bc", boxShadow: "none", p: 1, borderRadius: 50, minWidth: "57px", mx: 1 }}
        onClick={handleOpenDialog}
      >
        <S.IconWorker />
      </CustomButton>
      <DialogAddDetail open={open} onClose={handleCloseDialog} />
    </>
  );
}
