import { useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreTime from '@mui/icons-material/MoreTime';
import AccessTime from '@mui/icons-material/AccessTime';

// import useQuery from '../../hooks/useQuery';

export default function ButtonTimeOfJob() {
  // const { onChangeDate, setQuery, query } = useQuery();
  const [isTimeNow, setIsTimeNow] = useState(true);

  const handlerChangeTimeOfJob = useCallback(() => {
    setIsTimeNow(!isTimeNow)
  }, [isTimeNow])

  return (
    <>
      <IconButton aria-label="close" color="inherit" size="medium" 
        sx={{backgroundColor: isTimeNow ? 'rgba(40, 40, 40, 0.1)' : '#e5cb64ff', width: 'fit-content', position: 'relative'}} 
        onClick={handlerChangeTimeOfJob}
      >
        {isTimeNow ? <MoreTime sx={{color: '#17c1bc'}}/> : <AccessTime sx={{color: '#1976d2'}}/>} <span style={{fontSize: '0.6rem', color: '#17c1bc', fontWeight: 'bold', position: 'absolute', right: '-1px', top: '2px'}}>{isTimeNow ? '24' : ""}</span>
      </IconButton>
    </>
  );
}
