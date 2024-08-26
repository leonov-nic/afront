import { CustomButton } from '../common/button/button';
import { memo } from 'react';
import useQuery from '../../hooks/useQuery';

const ButtonAddJobs = memo(() => {
const { onChangeOffset, query }  = useQuery();

  return (
    <>
      <CustomButton
        data-name='111'
        sx={{ color: 'white', backgroundColor: "#96b8cc", boxShadow: "none", py: 2, px: 6, marginLeft: 'auto', borderRadius: 0}}
        onClick={onChangeOffset}
        text={query.lengthJobs && query.lengthJobs === 2 ? 'Загрузить ещё' : query.lengthJobs && query.lengthJobs < 2 ? 'Загрузить заново' : 'Загрузить заново'}
      >
      </CustomButton>
    </>
  );
});

export default ButtonAddJobs;
