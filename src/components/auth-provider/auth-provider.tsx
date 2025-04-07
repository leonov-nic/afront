import { useAppSelector } from '../../hooks/useAppSelector';
import { getAuthorizationStatus } from '../../store/user-process/user-process';
import { createContext, ReactNode } from 'react';
import { AuthorizationStatus } from '../../const';

export const AuthContext = createContext<AuthorizationStatus>(AuthorizationStatus.NoAuth);

export default function AuthProvider({children}: {children: ReactNode}): JSX.Element {
  const statusAuthorization = useAppSelector(getAuthorizationStatus);

  return (
    <AuthContext.Provider value={statusAuthorization}>
      {children}
    </AuthContext.Provider>
  );
}
