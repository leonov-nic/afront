import { useState, useCallback } from 'react';
import { CustomButton } from '../common/button/button';
import DrawerStatistics from '../drawer-statistics/drawer-statistics';

export default function ButtonOpenDrawerStatistics() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleCloseDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <CustomButton
        data-name='statistics'
        sx={{ backgroundColor: "#3498db", boxShadow: "none", px: 3, py: 1, minWidth: "57px", mx: 1, borderRadius: "7px", marginLeft: "auto" }}
        onClick={handleOpenDialog}
      >
        Info
      </CustomButton>
      <DrawerStatistics open={open} onClose={handleCloseDrawer}/>
    </>
  );
}
