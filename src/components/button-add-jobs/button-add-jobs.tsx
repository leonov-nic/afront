import { CustomButton } from '../common/button/button';
import { memo } from 'react';
import useQuery from '../../hooks/useQuery';

const ButtonAddJobs = memo(() => {
const { onChangeOffset, query }  = useQuery();

  return (
    <>
      <CustomButton
        data-name='111'
        sx={{ fontSize: '12px',color: 'white', backgroundColor: "#96b8cc", boxShadow: "none", py: 1.5, px: 5, marginTop: 'auto', width: 'fit-content'}}
        onClick={onChangeOffset}
        text={query.lengthJobs && query.lengthJobs === 2 ? 'load more' : query.lengthJobs && query.lengthJobs < 2 ? 'load again' : 'load again'}
      >
      </CustomButton>
    </>
  );
});

export default ButtonAddJobs;
