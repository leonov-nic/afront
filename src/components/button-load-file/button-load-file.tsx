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
      const fetchParams = {limit: 3000, createdAt: query.createdAt, filterByMonth: true};
      console.log("Параметры запроса:", fetchParams);

        const resultAction = await dispatch(fetchJobsByMonth(fetchParams)); 

      // 2. Проверяем, была ли ошибка через rejected.match
      if (fetchJobsByMonth.rejected.match(resultAction)) {
        // Вытаскиваем детали ошибки
        const serverError = resultAction.payload || resultAction.error;
        console.error("СЕРВЕР ВЕРНУЛ ОШИБКУ:", serverError);
        
        return; // Прерываем выполнение
      }

      // 3. Если ошибки нет, данные лежат в payload
      const jobs: TJobRDO[] = resultAction.payload; 
      console.log("Данные получены успешно, записей:", jobs?.length);

      // const jobs: TJobRDO[] = await dispatch(fetchJobsByMonth(fetchParams)).unwrap(); 
      // if (fetchJobsByMonth.rejected.match(jobs)) {
      //   const serverError = jobs.payload || jobs.error;
      //   console.error("СЕРВЕР ВЕРНУЛ ОШИБКУ:", serverError);
      //   return; 
      // }
    
      // 2. ПРОВЕРКА: Пришли ли данные вообще?
      console.log("Данные получены успешно. Количество записей:", jobs?.length);
      // const jobs: TJobRDO[] = await dispatch(fetchJobsByMonth({limit: 3000, createdAt: query.createdAt, filterByMonth: true})).unwrap(); 
      console.log("Начинаю инициализацию JsonToExcell...");
      const table = new JsonToExcell(jobs, 'table', query.createdAt);  
      table.init();  
      console.log("Файл должен был начать скачиваться.");
    } catch (err) { 
      console.error("ПОЛНАЯ ОШИБКА ПРИ ЗАГРУЗКЕ:", err);
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
