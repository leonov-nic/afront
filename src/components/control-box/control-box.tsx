import { memo, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import ButtonOpenDialogRemoveEmployee from '../button-open-dialog-remove-employee/button-open-dialog-remove-employee';
import ButtonOpenDialogAddEmployee from '../button-open-dialog-add-employee/button-open-dialog-add-employee';
import ButtonOpenDialogEditEmployee from '../button-open-dialog-edit-employee/button-open-dialog-edit-employee';
import ButtonOpenDialogAddDetail from '../button-open-dialog-add-detail/button-open-dialog-add-detail';
import ButtonOpenDialogUpdateDetail from '../button-open-dialog-update-detail/button-open-dialog-update-detail';
import ButtonOpenDialogAddToStorage from '../button-open-dialog-add-to-storage/button-open-dialog-add-to-storage';
import ButtonOpenDialogStorehouseOperation from '../button-open-dialog-add-storehouse-operation/button-open-dialog-add-storehouse-operation';

import DateFilter from '../date-filter/date-filter';
import { CustomButton } from '../common/button/button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useQuery from '../../hooks/useQuery';
import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
 } from '../../store/api-action';

const ControlBox = memo(() => {
  console.log('render ControlBox');
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { query } = useQuery();

  useLayoutEffect(() => {
    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());

  }, [dispatch, query]);

  return (
    <Box
      borderBottom="3px solid #93a9b8"
      borderTop="3px solid #93a9b8"
      position="relative"
      marginTop="10px"
      marginBottom="15px"
      display="flex"
      minHeight="auto"
      flexDirection={"row"}
      sx={{ backgroundColor: "#96b8cc", p: 0, ariaLabel: 'Without label' }}
    >
    {pathname !== '/storage' ? (
      <>
        <ButtonOpenDialogAddEmployee />
        <ButtonOpenDialogEditEmployee />
        <ButtonOpenDialogRemoveEmployee />
        {ButtonOpenDialogAddDetail && <ButtonOpenDialogAddDetail />}
        {ButtonOpenDialogUpdateDetail && <ButtonOpenDialogUpdateDetail />}
        <DateFilter />
      </>
    ) : <> 
          <ButtonOpenDialogAddToStorage/>
          <CustomButton
            sx={{
              position: 'relative',
              left: '15%',
              minWidth: '15%',
              display: 'flex',
              fontSize: '12px',
              color: 'white', 
              backgroundColor: '#247cc1',
              borderRadius: 1.5,
              boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
              width: 'fit-content',
              '&:hover': {backgroundColor: '#7690a0'}
            }}>Input Instrument
          </CustomButton>
          <CustomButton
            sx={{
              position: 'relative',
              left: '15%',
              minWidth: '15%',
              display: 'flex',
              fontSize: '12px',
              color: 'white', 
              backgroundColor: '#247cc1',
              borderRadius: 1.5,
              boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
              width: 'fit-content',
              '&:hover': {backgroundColor: '#7690a0'}
            }}>Input Ochrana
          </CustomButton>
          <CustomButton
            sx={{
              position: 'relative',
              left: '15%',
              minWidth: '15%',
              display: 'flex',
              fontSize: '12px',
              color: 'white', 
              backgroundColor: '#247cc1',
              borderRadius: 1.5,
              boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
              width: 'fit-content',
              '&:hover': {backgroundColor: '#7690a0'}
            }}>issuance
          </CustomButton>
          <CustomButton
            sx={{
              position: 'relative',
              left: '15%',
              display: 'flex',
              fontSize: '12px',
              color: 'white', 
              backgroundColor: '#247cc1',
              borderRadius: 1.5,
              boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
              width: 'fit-content',
              '&:hover': {backgroundColor: '#7690a0'}
            }}>Info
          </CustomButton>
          <ButtonOpenDialogStorehouseOperation/>
        </>
      }
    </Box>
  );
});

export default ControlBox;
