import { IResponse } from '../interfaces/response.interface';

export class ResponseError implements IResponse {
  constructor (infoMessage: string, data?: any) {
    this.success = false;
    this.message = infoMessage;
    this.data = data;
    console.warn(new Date().toString() + ' - [Response]: ' + infoMessage + (data ? ' - ' + JSON.stringify(data): ''));
  };

  message: string;
  data: any[];
  errorMessage: any;
  error: any;
  success: boolean;
}

export class ResponseSuccess implements IResponse {
  constructor (infoMessage: string, data?: any, notLog?: boolean) {
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if (!notLog) {
      try {
        const offuscanteRequest = JSON.parse(JSON.stringify(data));
        if (offuscanteRequest && offuscanteRequest.token) offuscanteRequest.token = '*******';
        console.log(new Date().toString() + ' - [Response]: ' + JSON.stringify(offuscanteRequest));
      } catch(error) {}
    }
  };

  message: string;
  data: any[];
  errorMessage: any;
  error: any;
  success: boolean;
}
