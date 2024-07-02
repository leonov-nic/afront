import { store } from '../store/index.js';
import { TUser, TJobRDO, TEmployee, TDetail} from './index.js';
import { AuthorizationStatus, SubmitStatus } from '../const.js';

export type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: TUser | null;
};

export type TJobProcess = {
  isJobSendingStatus: SubmitStatus,
  isLoading: boolean,
  jobs: TJobRDO[],
  employees: TEmployee[],
  details: TDetail[],
  sortDate: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
