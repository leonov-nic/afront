import * as S from './but-remove-employee.styled';
import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DialogRemoveEmployee from '../dialog-remove-employee/dialog-remove-employee';

export default function ButtonOpenDialogRemoveEmployee() {
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
        sx={{ backgroundColor: "#e44848", boxShadow: "none", p: 1, borderRadius: 0, width: "0.5ch" }}
        onClick={handleOpenDialog}
      >
        <S.IconWorker/>
      </CustomButton>
      <DialogRemoveEmployee open={open} onClose={handleCloseDialog}/>
    </>
  );
}
