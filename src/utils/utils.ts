// import {utils, writeFile} from 'xlsx';
// import { ChangeEvent } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const dictionary = <T extends { _id: string | undefined }>(array: T[]) => {
  const dictionary = new Map<string | undefined, T>();
  array && array.map(element => {
    dictionary.set(element._id, element);
  });
  return dictionary;
}

export class Token {
  private static _name = 'vote-auth-token';

  static get() {
    const token = localStorage.getItem(this._name);

    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(this._name, token);
  }

  static drop() {
    localStorage.removeItem(this._name);
  }
}

export const humanizeDate = (date: string): string => dayjs(date).format('DD.MM.YYYY');

export const getNewTimeInDate = (time: string) => {
  if (!time) {return;}
  const [hours, minutes] = time.split(':').map(Number);
  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(0);
  return currentDate.toISOString();
}

export const isTimeSameOrBefore = (timeFrom: string, timeTo: string) => {
  return dayjs(getNewTimeInDate(`${timeFrom && timeFrom}`)).isSameOrBefore(getNewTimeInDate(`${timeTo}`), 'minute');
}

export const isTimeSameOrAfter = (timeTo: string, timeFrom: string) => {
  return dayjs(getNewTimeInDate(`${timeTo && timeTo}`)).isSameOrAfter(getNewTimeInDate(`${timeFrom}`), 'minute');
}

export const getDataNow = () => {
  const data = new Date();
  return data.toISOString();
}

export const getDay = () => {
  const data = new Date();
  return `${data.getDate() >= 10 ? data.getDate() : `0${data.getDate()}`}.${  data.getMonth() >= 10 ? data.getMonth()+1 : `0${data.getMonth()+1}`}.${data.getFullYear()}`;
}

export const getHours = (date: string) => {
  const d = new Date(date);
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h < 10 ? `0${h}` : h}:${m === 0 ? `0${m}` : m}`;
}

export const getDayAndMonth = (date: string) => {
  const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
  const month = new Date(date).getMonth() < 10 ? `0${new Date(date).getMonth()+1}` : new Date(date).getMonth()
  return `${day}.${month}`;
}

// export default class TableToExcell {
//   private _table: HTMLElement | null = null;
//   private _tableName;

//   constructor(table: string, tableName: string) {
//     this._table = document.getElementById(`${table}`);
//     this._tableName = tableName;
//     this._writeToFileHandler = this._writeToFileHandler.bind(this);
//   }

//   init() {
//     if (this._table) {
//       this._writeToFileHandler();
//     }
//   }

//   _writeToFileHandler() {
//     this._writeToFileHundler();
//   }

//   _writeToFileHundler() {
//     const workbook = utils.book_new();
//     const sheet = utils.table_to_sheet(this._table);
//     utils.book_append_sheet(workbook, sheet, 'Sheet1');
//     writeFile(workbook, `${this._tableName}.xlsx`);
//   }
// }
