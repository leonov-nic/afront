import { useState, useCallback } from 'react';
import { CustomButton } from '../common/button/button';
import DialogAddStorehouseOperation from '../dialog-add-storehouse-operation/dialog-add-storehouse-operation';
import AddLinkIcon from '@mui/icons-material/AddLink';

export default function ButtonOpenDialogStorehouseOperation() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpen(!open)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <CustomButton
        data-name='storage'
        sx={{ backgroundColor: "#17c1bc", boxShadow: "none", px: 3, py: 1, minWidth: "57px", mx: 1, borderRadius: "7px", marginLeft: "auto" }}
        onClick={handleOpenDialog}
      >
        <AddLinkIcon fontSize='large'/>
      </CustomButton>
      <DialogAddStorehouseOperation open={open} onClose={handleCloseDialog} />
    </>
  );
}
