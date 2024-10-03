import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { TJobRDO, TEmployeeRDO, TDetail, TNameOfJob, TUserRDO } from '../types';
// import { ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc'
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

export const getDataAndResetTime = (data: Dayjs | null) => {
  if (data == null) {return;}
  return dayjs(data).format();
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
  const month = new Date(date).getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month; 
  return `${day}.${formattedMonth}`;
}

export const getMonth = (date: string) => {
  const month = new Date(date).getMonth();
  return month;
}

export const getDataNowWithResetTime = () => {
  const data = new Date();
  data.setHours(0, 0, 0, 0);
  return dayjs(data).utc().local().format();
}

export default class JsonToExcell {
  private _data: TJobRDO[] | null = null;
  private _tableName;
  private _date;

  constructor(jobs: TJobRDO[], tableName: string, date: string | undefined) {
    this._data = jobs;
    this._tableName = tableName;
    this._date = date;
    this._writeToFileHandler = this._writeToFileHandler.bind(this);
  }

  init() {
    if (this._date) {
      this._writeToFileHandler();
    }
  }

  private async _writeToFileHandler() {
    await this._writeToFileHundler();
  }

  private async _writeToFileHundler() {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet(`${this._tableName}`, {properties:{tabColor:{argb:'FFC0000'}}});
    workbook.calcProperties.fullCalcOnLoad = true;

    if (this._data?.length) {
      const rows = createRowsForExellFile(this._data);

      const headers = rows && Object.keys(rows[0]);
      headers.forEach((_header, index) => {
        sheet.getColumn(index + 1).width = 14;
      });
  
      const headerRow = sheet.addRow(headers);
      headerRow.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        };
        cell.fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor: { argb: 'FFCCCCCC' }, 
        };
      });
      rows && rows.forEach((row) => {
        const newRow = sheet.addRow(Object.values(row));
        newRow.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
          };
        });
      });
    } else {
      return;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([buffer], {type: fileType});
    saveAs(blob, `${this._date && months[getMonth(this._date)]}.xlsx`);
  }
}

export const createDataForTable = (
  _id: string,
  createdAt: string,
  employeeId: string,
  employee: TEmployeeRDO,
  timeFrom: string,
  timeTo: string,
  totalHours: number | undefined,
  detailId: string,
  detail: TDetail | undefined,
  typeOfJob: TNameOfJob,
  quantity: number,
  master: TUserRDO,
  extra?: number,
  comment?: string,
) => {
  return { _id, createdAt, employeeId, employee, timeFrom, timeTo, totalHours, detailId, detail, typeOfJob, extra, quantity, comment, master };
}

export const createRowsForTable = (jobs: TJobRDO[]) => {
  const rows = jobs.map(job => createDataForTable(
    job._id,
    job.createdAt,
    job.employeeId,
    job.employee,
    job.timeFrom,
    job.timeTo,
    job.totalHours,
    job.detailId,
    job.detail,
    job.typeOfJob,
    job.quantity,
    job.master,
    job.extra,
    job.comment
  ));

  return rows;
}


export const createRowsForExellFile = (jobs: TJobRDO[]) => {
  const rows = jobs.map(job => {
  
    return {
    "Date": getDayAndMonth(job.createdAt),
    "№": job.employee.registrationNumber,
    "Employee": job.employee.familyName,
    "TimeFrom": job.timeFrom !== '-' ? getHours(job.timeFrom) : '-',
    "TimeTo": job.timeTo !== '-' ? getHours(job.timeTo) : '-',
    "TotalHours": job.totalHours,
    "Detail": job.detail?.shortName !== '0' ? job.detail?.shortName : '-',
    "Type Of Job": job.typeOfJob,
    "Extra": job.extra || "-",
    "Quantity": job.quantity !== 0 ? job.quantity : '-',
    "Master": job.master.name,
    "Comment": job.comment || "-"};
  });

  return rows;
}

