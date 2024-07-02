import * as S from './but-edit-employee.styled';
import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DialogEditEmployee from '../dialog-edit-employee/dialog-edit-employee';

export default function ButtonOpenDialogEditEmployee() {
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
        data-name='222'
        sx={{ backgroundColor: "#e4ba48", boxShadow: "none", p: 1, borderRadius: 0, width: "0.5ch" }}
        onClick={handleOpenDialog}
      >
        <S.IconWorker/>
      </CustomButton>
      <DialogEditEmployee open={open} onClose={handleCloseDialog}/>
    </>
  );
}
