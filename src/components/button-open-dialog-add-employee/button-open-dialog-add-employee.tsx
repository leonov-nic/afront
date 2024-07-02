import * as S from './but-add-employee.styled';
import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DialogAddEmployee from '../dialog-add-employee/dialog-add-employee';

export default function ButtonOpenDialogAddEmployee() {
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
        data-name='111'
        sx={{ backgroundColor: "#17c1bc", boxShadow: "none", p: 1, borderRadius: 0}}
        onClick={handleOpenDialog}
      >
        <S.IconWorker/>
      </CustomButton>
      <DialogAddEmployee open={open} onClose={handleCloseDialog}/>
    </>
  );
}
