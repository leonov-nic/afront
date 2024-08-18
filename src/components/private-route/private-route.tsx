import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import { getAuthorizationStatus } from '../../store/user-process/user-process';
import { AuthorizationStatus } from '../../const';
import useAuth from '../../hooks/useAuth';
type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: string;
  children: JSX.Element;
}

export default function PrivateRoute({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element {
  // const statusAuthorization = useAppSelector(getAuthorizationStatus);
  const statusAuthorization = useAuth();
  // console.log(restrictedFor, redirectTo);

  return ( 
    statusAuthorization === restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
}
