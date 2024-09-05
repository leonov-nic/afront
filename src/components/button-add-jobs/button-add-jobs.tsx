import { CustomButton } from '../common/button/button';
import { memo } from 'react';
import useQuery from '../../hooks/useQuery';
import { baseQuery } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getJobsCount } from '../../store/job-process/job-process';

const ButtonAddJobs = memo(() => {
const { onChangeOffset, query }  = useQuery();
const count = useAppSelector(getJobsCount);
console.log(count);

  return (
    <>
      <CustomButton
        data-name='111'
        sx={{ 
          fontSize: '12px',
          color: 'white', 
          backgroundColor: query.lengthJobs && query.lengthJobs === baseQuery.limit ? 
            '#96b8cc' : query.lengthJobs && query.lengthJobs < baseQuery.limit ? '#e44848' : '#e44848',
          boxShadow: "none", py: 1.5, px: 5, marginTop: 'auto', 
          width: 'fit-content',
          '&:hover': {backgroundColor: query.lengthJobs && query.lengthJobs === baseQuery.limit ?  
            '#7690a0' : query.lengthJobs && query.lengthJobs < baseQuery.limit ? '#c54242' : '#c54242'}
        }}
        onClick={onChangeOffset}
        text={query.lengthJobs && query.lengthJobs === baseQuery.limit ? 
          'load more' : query.lengthJobs && query.lengthJobs < baseQuery.limit ? 'load again' : 'load again'}
      >
      </CustomButton>
    </>
  );
});

export default ButtonAddJobs;
