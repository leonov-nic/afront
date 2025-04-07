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
import ButtonOpenDialogEditStorage from '../button-open-dialog-edit-storage/button-open-dialog-edit-storage';
import SelectFilterTypeStorehouse from '../select-filter-type-storehouse/select-filter-type-storehouse';
import useQueryStoreOperations from '../../hooks/useQueryStoreOperations';

import DateFilter from '../date-filter/date-filter';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useQuery from '../../hooks/useQuery';
import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
  fetchStoreHouse,
  fetchStoreHouseOperation
 } from '../../store/api-action';

const ControlBox = memo(() => {
  console.log('render ControlBox');
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { query } = useQuery();
  const { query: queryOperations } = useQueryStoreOperations();

  useLayoutEffect(() => {
    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());
    dispatch(fetchStoreHouse());
    dispatch(fetchStoreHouseOperation(queryOperations));
  }, [dispatch, query, queryOperations]);

  return (
    <Box
      borderBottom="3px solid #93a9b8"
      borderTop="3px solid #93a9b8"
      position="relative"
      marginTop="10px"
      marginBottom={pathname !== '/storage' ? "15px" : "0"}
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
          <ButtonOpenDialogEditStorage />

          <SelectFilterTypeStorehouse />
          <ButtonOpenDialogStorehouseOperation/>
        </>
      }
    </Box>
  );
});

export default ControlBox;
