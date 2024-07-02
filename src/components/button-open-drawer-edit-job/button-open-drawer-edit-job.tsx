import { CustomButton } from '../common/button/button';
import { useState } from 'react';
import DrawerEditJob from '../drawer-edit-job/drawer-edit-job';
import { TJobRDO } from '../../types';

export default function ButtonOpenDrawerEditJob({row}: {row: TJobRDO}) {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(!open)
  }

  const handleCloseDrawer = () => {
    setOpen(false)
  }

  return (
    <>
      <CustomButton
        sx={{p: 1, width: '100%', borderBottom: '1px solid rgba(40, 40, 40, 0.2)',
        '&:hover': {backgroundColor: 'rgba(40, 40, 40, 0.2)', color: 'white'}, backgroundColor: 'transparent',
        color: '#247cc1', fontSize: '12px'}}
        onClick={handleOpenDrawer}
      >
        Edit
      </CustomButton>
      <DrawerEditJob row={row} open={open} onClose={handleCloseDrawer}/>
    </>
  );
}
