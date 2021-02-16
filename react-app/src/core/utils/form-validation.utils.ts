import { ValidationRules } from 'react-hook-form';
import { ErrorMessages } from '../enums';
import { Patterns } from './patterns';

export const getRequiredValidation = (): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
  };
};

export const getEmailValidation = (): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
    pattern: { value: Patterns.mail, message: ErrorMessages.MAIL_PATTERN },
  };
};

export const getPasswordValidation = (minLength: number, maxLength: number): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
    pattern: { value: Patterns.password, message: ErrorMessages.PASSWORD_PATTERN },
    minLength: { value: minLength, message: `${ErrorMessages.MIN_LENGTH} ${minLength}` },
    maxLength: { value: maxLength, message: `${ErrorMessages.MAX_LENGTH} ${maxLength}` },
  };
}

export const getPhoneValidation = (minLength: number, maxLength: number): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
    minLength: { value: minLength, message: ErrorMessages.PHONE_PATTERN },
    maxLength: { value: maxLength, message: ErrorMessages.PHONE_PATTERN },
    pattern: {value: Patterns.phone, message: ErrorMessages.PHONE_PATTERN}
  };
}