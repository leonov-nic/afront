import { UserType, TypeProduct } from "../const";
import { TYPES, NAMESOFJOB, TypeOperation } from "../const";

export type CountByDirection = {
  [key: string]: number;
}

export interface Query {
  createdAt: string | undefined ;
  limit: number;
  offset: number;
  lengthJobs: number;
}

export interface QueryStorehouseOperations {
  createdAt?: string;
  limit?: number;
  page?: number;
  typeProduct?: keyof typeof TypeProduct | '',
  type?: keyof typeof TypeOperation | '';
}

export interface QueryByMonth {
  createdAt: string | undefined ;
  limit?: number;
  filterByMonth: boolean;
}

export type TEmployee = {
  _id: string | undefined ;
  familyName: string;
  registrationNumber: number | undefined;
  mainJob: string | undefined;
  masterId: string | undefined ;
}

export type TEditEmployee = Omit<TEmployee, 'masterId'> & { typeOfJob?: string } & { employeeId?: string };

export type TNewEmployee = Pick<TEmployee, 'familyName' | 'registrationNumber' | 'mainJob'> & { typeOfJob?: string };
export type TEmployeeRDO = Omit<TEmployee, 'masterId'>

export type TNameOfJob = typeof NAMESOFJOB[number];

export type TTypeOfJob = {
  name: string;
  longName: string;
}

export type TDetail = {
  _id: string | undefined;
  shortName: string;
  longName: string;
  normOfMinute?: number | null;
  customer: string;
}

export type TNewDetail = Omit<TDetail, '_id'>

export type TJob = {
  employeeId: string;
  timeFrom: string | undefined;
  timeTo: string | undefined;
  detailId: string;
  typeOfJob: TNameOfJob | undefined;
  extra: number | undefined;
  quantity: number | undefined;
  master: string;
  comment?: string;
}

export type TSelectJob = TJob & { familyName?: string } & { registrationNumber?: number };

export type TUpdateJob = Omit<TJobRDO, 'employee' | 'totalHours' | 'detail' | 'master'> & { master?: string };

export type TJobRDO = {
  _id: string;
  createdAt: string;
  employeeId: string;
  employee: TEmployeeRDO;
  timeFrom: string;
  timeTo: string;
  totalHours?: number;
  detailId: string;
  detail?: TDetail;
  typeOfJob: TNameOfJob;
  extra?: number;
  quantity: number;
  comment?: string;
  count?: number;
  master: TUserRDO;
}

export type TUserType  = typeof TYPES[number];

export type TUser = {
  _id: string;
  name: string;
  email: string;
  type: TUserType;
  avatar?: string;
}

export type TUserRDO = Omit<TUser, 'avatar'>

export type UserRegister = TUser & Pick<TSubmitUser, 'password'>;
export type TSubmitUser = Pick<TUser, 'email'> & { password: string };


export class UserDto {
  public _id!: string;
  public email!: string;
  public type!: UserType;
}

export class VoterDto {
  public id!: string;
  public family!: string;
  public name!: string;
  public surname!: string;
  public phone!: number;
  public registration!: number;
  public address!: string;
  public job!: string;
  public direction!: string;
  public isCurrent!: boolean;
}

export class UserWithTokenDto {
  public token!: string;
  public email!: string;
  public name!: string;
  public type!: UserType;
  public _id!: string;
}

export type TStoreHouse = {
  _id: string,
  name: string;
  company: string;
  characteristics?: string;
  size?: string;
  diameter?: number;
  type: string;
  price?: number;
  isActive?: boolean;
  currentQuantity: number;
}

export type TStoreHouseDTO = Omit<TStoreHouse, '_id' | 'currentQuantity' | 'isActive'>
export type TStoreEditDTO = TStoreHouseDTO & Pick<TStoreHouseOperation, 'productId'>

export type TStoreHouseOperation = {
  _id: string,
  productId: string;
  employeeId?: string | null;
  box?: number;
  amount: number;
  totalAmount: number;
  typeOperation: TypeOperation;
  fromWhom?: string;
  comment?: string;
  currentQuantityProduct?: number;
}

export type TStoreHouseOperationRDO = TStoreHouseOperation & { createdAt: string, employee?: TEmployeeRDO, product: TStoreHouse };

export type TStoreHouseOperationDTO = Omit<TStoreHouseOperation, '_id'>
