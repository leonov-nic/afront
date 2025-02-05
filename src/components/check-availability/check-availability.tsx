import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';
import { getStoreHousePositions } from '../../store/stotrehouse-process/storehouse-process';
import SelectStorehousePositionWithoutFormik from '../select-storehouse-position-without-formik/select-storehouse-position-without-formik';

export default function CheckAvailability(): JSX.Element | null {
  const [currentStoreHouse, setCurrentStoreHouse] = useState<string[]>([]);
  const storeHousePositions = useAppSelector(getStoreHousePositions);
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentStoreHouse([]); 
  }, [storeHousePositions]);


  return (pathname === '/storage' ?
    <Box sx={{
      textAlign: 'right', 
      position: 'relative', 
      right: '50px', 
      minWidth: '310px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <p style={{margin: '0', marginLeft: 'auto', marginRight: '25px'}}>
        {currentStoreHouse.length === 0 ? <>check<br/>availability</> : currentStoreHouse[2]}
      </p>
      <SelectStorehousePositionWithoutFormik sx={{maxWidth: "120px", minWidth: "190px"}} onChange={setCurrentStoreHouse} storeHouse={storeHousePositions}/>
    </Box> : null
  );
}
