import { TNameOfJob, TTypeOfJob, Query } from './types/index';
import { getDataNowWithResetTime } from './utils/utils';

// export const BACKEND_URL = 'http://localhost:5002/';
export const BACKEND_URL = '/';
export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_JOBS = 200;
export const STORE_HOUSE_TYPES = ['instruments', 'safety', 'other'];
export const STORE_HOUSE_FROM_WHOOM = ['Vololodya', 'Alsfeld', 'Amberg', 'Vitalick', 'Slava', 'Zhenya',];

export const baseQuery: Query = {
  createdAt: getDataNowWithResetTime(),
  limit: MAX_JOBS,
  offset: 0,
  lengthJobs: MAX_JOBS,
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const customGreen = {
  200: '#17c1bc',
  300: '#64eae6',
};

export enum SubmitStatus {
  Still = '',
  Pending = 'Отправляется',
  Fullfilled = 'Успешно отправлено',
  Rejected = 'Запрос прерван',
}

export enum AppRoute {
  Main = '/main',
  Root = '/',
  Entrance = '/entrance',
  Store = '/store',
}

export enum NameSpace {
  User = 'USER',
  App = 'APP',
}

export enum UserType {
  Admin = 'admin',
  Regular = 'regular',
  Storage = 'storage',
}

export const TYPES = ['admin', 'regular', 'storage'] as const;

export enum TypeOperation {
  Shipment = 'Shipment',
  Arrival = 'Arrival',
  initial = '',
}

export const NAMESOFJOBBOXONE = [
  'f',
  'kd',
  'nn',
  'u',
  'k',
  'kbd',
  'fa',
  's',
];

export const NAMESOFJOBBOXTWO = [
  'b',
  'kon',
  'n',
  'rep',
  'sta',
  'ubo',
  'wtr',
  'doo',
  'k',
  'll',
  'ls',
  'ner',
  'vom',
  'adm',
  'baum',
  'pac',
  'sob',
];

export const setJobBoxOne = new Set();
NAMESOFJOBBOXONE.map((item) => {
  setJobBoxOne.add(item);
})

export const setJobBoxTwo = new Set();
NAMESOFJOBBOXTWO.map((item) => {
  setJobBoxTwo.add(item);
})

export const NAMESOFJOB = [
  'b',
  'f',
  'kd',
  'kon',
  'ma',
  'md',
  'mk',
  'mn',
  'ms',
  'mz',
  'n',
  'nn',
  'rep',
  'sta',
  'ubo',
  'wtr',
  'doo',
  'u',
  'k',
  'kbd',
  'll',
  'ls',
  'ml',
  'ner',
  'vom',
  'adm',
  'baum',
  'fa',
  'pac',
  's',
  'sob',
];

export const TypesOfJob: { [key in TNameOfJob]: TTypeOfJob } = {
  b: {
    name: 'b',
    longName: 'brigadieren',
  },
  f: {
    name: 'f',
    longName: 'feiertag',
  },
  kd: {
    name: 'kd',
    longName: 'kranken Den',
  },
  kon: {
    name: 'kon',
    longName: 'kontrolle',
  },
  ma: {
    name: 'ma',
    longName: 'arbeit minuten',
  },
  md: {
    name: 'md',
    longName: 'dop minuti (ot klienta)',
  },
  mk: {
    name: 'mk',
    longName: 'kontroll minuten',
  },
  mn: {
    name: 'mn',
    longName: 'dop minuti (ot nas)',
  },
  ms: {
    name: 'ms',
    longName: 'strahl minuten',
  },
  mz: {
    name: 'mz',
    longName: 'big strahlen arbeit',
  },
  n: {
    name: 'n',
    longName: 'net raboti (oplachivajem rabotnjiku)',
  },
  nn: {
    name: 'nn',
    longName: 'ne rabotal (ne oplat, vihodnoi)',
  },
  rep: {
    name: 'rep',
    longName: 'remont el.oborudovania',
  },
  sta: {
    name: 'sta',
    longName: 'stapler',
  },
  ubo: {
    name: 'ubo',
    longName: 'uborka ceha',
  },
  wtr: {
    name: 'wtr',
    longName: 'wtralj',
  },
  doo: {
    name: 'doo',
    longName: 'dorabotka oshibok',
  },
  u: {
    name: 'u',
    longName: 'urlaub',
  },
  k: {
    name: 'k',
    longName: 'kranken',
  },
  kbd: {
    name: 'kbd',
    longName: 'kranken bezBolnicnogo den',
  },
  ll: {
    name: 'll',
    longName: 'lernen (lehrer)',
  },
  ls: {
    name: 'ls',
    longName: 'lernen (skolnieks)',
  },
  ml: {
    name: 'ml',
    longName: 'lehrer skolnieks minut',
  },
  ner: {
    name: 'ner',
    longName: 'neizvestnaja rabota',
  },
  vom: {
    name: 'vom',
    longName: 'vodjitelj mashini',
  },
  adm: {
    name: 'adm',
    longName: 'administrieren',
  },
  baum: {
    name: 'baum',
    longName: 'stroika ceha',
  },
  fa: {
    name: 'fa',
    longName: 'fail',
  },
  pac: {
    name: 'pac',
    longName: 'packung',
  },
  s: {
    name: 's',
    longName: 'storungen',
  },
  sob: {
    name: 'sob',
    longName: 'sobranie',
  },
};

export const typesJob: TTypeOfJob[] = [
  {
    name: 'b',
    longName: 'brigadieren',
  },{
    name: 'f',
    longName: 'feiertag',
  },{
    name: 'kd',
    longName: 'kranken Den',
  },{
    name: 'kon',
    longName: 'kontrolle',
  },{
    name: 'ma',
    longName: 'arbeit minuten',
  },{
    name: 'md',
    longName: 'dop minuti (ot klienta)',
  },{
    name: 'mk',
    longName: 'kontroll minuten',
  },{
    name: 'mn',
    longName: 'dop minuti (ot nas)',
  },{
    name: 'ms',
    longName: 'strahl minuten',
  },{
    name: 'mz',
    longName: 'big strahlen arbeit',
  },{
    name: 'n',
    longName: 'net raboti (oplachivajem rabotnjiku)',
  },{
    name: 'nn',
    longName: 'ne rabotal (ne oplat, vihodnoi)',
  },{
    name: 'rep',
    longName: 'remont el.oborudovania',
  },{
    name: 'sta',
    longName: 'stapler',
  },{
    name: 'ubo',
    longName: 'uborka ceha',
  },{
    name: 'wtr',
    longName: 'wtralj',
  },{
    name: 'doo',
    longName: 'dorabotka oshibok',
  },{
    name: 'u',
    longName: 'urlaub',
  },{
    name: 'k',
    longName: 'kranken',
  },{
    name: 'kbd',
    longName: 'kranken bezBolnicnogo den',
  },{
    name: 'll',
    longName: 'lernen (lehrer)',
  },{
    name: 'ls',
    longName: 'lernen (skolnieks)',
  },{
    name: 'ml',
    longName: 'lehrer skolnieks minut',
  },{
    name: 'ner',
    longName: 'neizvestnaja rabota',
  },{
    name: 'vom',
    longName: 'vodjitelj mashini',
  },{
    name: 'adm',
    longName: 'administrieren',
  },{
    name: 'baum',
    longName: 'stroika ceha',
  },{
    name: 'fa',
    longName: 'fail',
  },{
    name: 'pac',
    longName: 'packung',
  },{
    name: 's',
    longName: 'storungen',
  },{
    name: 'sob',
    longName: 'sobranie',
  }
]
