export enum ErrorMessages {
  MAIL_PATTERN = 'Incorrect Mail',
  PHONE_PATTERN = 'Incorrect Phone',
  PASSWORD_PATTERN = 'Req Upper and Lower case',
  REQUIRED = 'Field is required',
  MAX_LENGTH = 'Required len more then',
  MIN_LENGTH = 'Required len less then',
  MAIL_EXIST = 'Mail exist',
  PHONE_EXIST = 'Phone exist',
}

export enum PositiveFormResponse {
  MAIL_IS_OK = 'Correct Mail',
  PHONE_IS_OK = 'Correct Phone',
}

export enum ValidationFields {
  REQUIRED = 'required',
  MIN = 'min',
  MAX = 'max',
  MAX_LENGTH = 'maxLength',
  MIN_LENGTH = 'minLength',
  PATTERN = 'pattern',
  VALIDATE = 'validate',
}