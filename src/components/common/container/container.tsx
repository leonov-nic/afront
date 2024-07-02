import * as S from './container.styled';
import { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  $mt?: string;
  $mh?: string;
  $mb?: string;
  $overflow?: string;
  $overflowY?: string;
  $padding?: string;
  $paddingTablet?: string;
};

const Container: React.FC<ContainerProps> = ({children, ...style}) => (
  <S.Container {...style}>{children}</S.Container>
);

export default Container;


