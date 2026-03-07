import { useState } from 'react'; 
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);
  const { query } = useQuery();

  const handleLoadFile = async () => { 
    setIsLoading(true);
    try { 
      const fetchParams = {limit: 3000, createdAt: query.createdAt, filterByMonth: true};

      const resultAction = await dispatch(fetchJobsByMonth(fetchParams)); 

      if (fetchJobsByMonth.rejected.match(resultAction)) {
        const serverError = resultAction.payload || resultAction.error;
        console.error("Server Error! Front", serverError);
        return; 
      }

      const jobs: TJobRDO[] = resultAction.payload; 

      // const jobs: TJobRDO[] = await dispatch(fetchJobsByMonth(fetchParams)).unwrap(); 
      // if (fetchJobsByMonth.rejected.match(jobs)) {
      //   const serverError = jobs.payload || jobs.error;
      //   console.error("СЕРВЕР ВЕРНУЛ ОШИБКУ:", serverError);
      //   return; 
      // }
 
      const table = new JsonToExcell(jobs, 'table', query.createdAt);  
      table.init();  
    } catch (err) { 
      console.error("Full Error:", err);
      if (err instanceof Error) { 
        toast.error(`Error... – ${err.message}. Try again`,
        {style: {background: '#e44848',}});
        console.error(`Error loading – ${err.message}`);
      } 
    } finally {
      setIsLoading(false); 
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
      {isLoading && (
        <p style={{fontSize: '12px', lineHeight: '13px', position: 'absolute', top: '35%', right: '18%'}}>
          File loading...
        </p>
      )}
    </>
  );
}
