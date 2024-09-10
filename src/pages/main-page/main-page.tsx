import { Helmet } from 'react-helmet-async';
import * as S from './main-page.styled';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';
import FormAddJob from '../../components/form-add-job/form-add-job';
import MainTable from '../../components/main-table/main-table';
import ControlBox from '../../components/control-box/control-box';
import ButtonAddJobs from '../../components/button-add-jobs/button-add-jobs';

export default function MainPage(): JSX.Element {
  console.log('render MainPage');

  return (
    <MainLayout>
      <Helmet>
        <title>VOITTO-app</title>
      </Helmet>

      <S.Main>
        <Container>
          <ControlBox />
        </Container>

        <Container $paddingTablet="10px">
          <FormAddJob />
        </Container>

        <Container className="container" $mt="10px" $overflow="auto" style={{alignItems: 'center', display: 'flex', minHeight: '65vh', flexDirection: 'column'}}>
          <MainTable/>
          <ButtonAddJobs/>
        </Container>
        
      </S.Main>
    </MainLayout>
  );
}
