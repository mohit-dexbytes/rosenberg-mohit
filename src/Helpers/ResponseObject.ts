const HttpStatus = require('http-status');

/**
 * @class ResponseObject
 */


class ResponseObject {

  /**
   *Creates an instance of ResponseObject.
   * @param {*} statusCode
   * @param {*} data
   * @memberof ResponseObject
   * @returns {object}
   */
  Error: any;
  Success: any;
  data: any;
  msg: string;
  responseObject: any;
  constructor(statusCode: number, msg: string, data?: any) {
    this.Error = false;
    this.Success = false;

    this.data = data;
    this.msg = msg;

    if ((statusCode === 200) || (statusCode === 201)) {
      this.Success = {
        code: statusCode,
        type: HttpStatus[statusCode],
        message: this.msg,
        data: this.data
      };
    } else {
      this.Error = {
        code: statusCode,
        type: HttpStatus[statusCode],
        message: this.msg
      };
    }

    this.responseObject = {
      error: this.Error,
      success: this.Success
    };

    return this.responseObject;
  }
}

export default ResponseObject;
