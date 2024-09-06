import { CustomButton } from '../common/button/button';
import { memo } from 'react';
import useQuery from '../../hooks/useQuery';
import { baseQuery } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getJobsCount } from '../../store/job-process/job-process';

const ButtonAddJobs = memo(() => {
const { onChangeOffset, query }  = useQuery();
const count = useAppSelector(getJobsCount);

  return (
    <>
      {(count && query.lengthJobs < count) || (count && count > baseQuery.limit && count == query.lengthJobs) ? <CustomButton
        data-name='111'
        sx={{ 
          fontSize: '12px',
          color: 'white', 
          backgroundColor: Number(query.lengthJobs) < Number(count) ? '#96b8cc' : '#e44848',
          boxShadow: "none", py: 1.5, px: 5, marginTop: 'auto', 
          width: 'fit-content',
          '&:hover': {backgroundColor: Number(query.lengthJobs) < Number(count) ? '#7690a0' : '#c54242'}
        }}
        onClick={onChangeOffset}
        text={Number(query.lengthJobs) < Number(count) ? 'load more' : 'load again'}
      >
      </CustomButton> : null} 
    </>
  );
});

export default ButtonAddJobs;
