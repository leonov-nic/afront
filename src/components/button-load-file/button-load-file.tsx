import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from "@mui/material";

import JsonToExcell from '../../utils/utils';
import { TJobRDO } from '../../types';
import { fetchJobsByMonth } from '../../store/api-action';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useQuery from '../../hooks/useQuery';

import { getUserStatus } from '../../store/user-process/user-process';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function ButtonLoadFile() {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);
  const { query } = useQuery();

  const handleLoadFile = async () => { 
    try { 
      const jobs: TJobRDO[] = await dispatch(fetchJobsByMonth({createdAt: query.createdAt, filterByMonth: true})).unwrap(); 
      const dd = new JsonToExcell(jobs, 'table', query.createdAt);  
      dd.init();  
    } catch (err) { 
      if (err instanceof Error) { 
        toast.error(`Ошибка загрузки – ${err.message}. Попробуйте ещё раз`,
        {style: {background: '#e44848',}});
        console.error(`Ошибка загрузки – , ${err.message}`);
      } 
    } 
  }

  return (
    userStatus === 'admin' &&
    <>
      <IconButton
          sx={{p: 1, border: '3px solid rgba(255, 255, 255, 0.2)',  
              '&:hover': {backgroundColor: 'rgba(40, 40, 40, 0.1)', color: 'orange'}, 
              backgroundColor: 'transparent',
              color: 'white'}}
          onClick={handleLoadFile}
      >
          <FileDownloadIcon />
      </IconButton>
    </>
  );
}
