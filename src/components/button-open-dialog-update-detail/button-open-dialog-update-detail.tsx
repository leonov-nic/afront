import * as S from './but-add-detail.styled';
import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DialogUpdateDetail from '../dialog-update-detail/dialog-update-detail';

// import { getUserStatus } from '../../store/user-process/user-process';
// import { useAppSelector } from '../../hooks/useAppSelector';

export default function ButtonOpenDialogUpdateDetail() {
  // const userStatus = useAppSelector(getUserStatus);

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(!open)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    // userStatus === 'admin' && 
    <>
      <CustomButton
        data-name='111'
        sx={{ backgroundColor: "#e4ba48", boxShadow: "none", p: 1, borderRadius: 50, minWidth: "57px" }}
        onClick={handleOpenDialog}
      >
        <S.IconWorker />
      </CustomButton>
      <DialogUpdateDetail open={open} onClose={handleCloseDialog} />
    </>
  );
}
