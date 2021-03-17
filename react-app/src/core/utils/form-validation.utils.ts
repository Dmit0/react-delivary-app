import { ValidationRules } from 'react-hook-form';
import { AuthenticationApi } from '../api/apis/authentication.api';
import { ErrorMessages } from '../enums';
import { Patterns } from './patterns';

export const getRequiredValidation = (): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
  };
};

export const getEmailValidation = (isNeedEmailToBeExist = false, isNeedAsyncValidation = true): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
    pattern: { value: Patterns.mail, message: ErrorMessages.MAIL_PATTERN },
    validate: async (value: string) => {
      if (!isNeedAsyncValidation) return
      if (!value) return ErrorMessages.REQUIRED;
      if (!value.match(Patterns.mail)) return ErrorMessages.MAIL_PATTERN;
      const isMailExist = await AuthenticationApi.verifyMail(value);
      if (isMailExist && !isNeedEmailToBeExist) return ErrorMessages.MAIL_EXIST;
      return true
    }
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

export const getPhoneValidation = (minLength: number, maxLength: number, currentPhonePrefix = '375', isNeedAsyncValidation = true): ValidationRules => {
  return {
    required: { value: true, message: ErrorMessages.REQUIRED },
    minLength: { value: minLength, message: ErrorMessages.PHONE_PATTERN },
    maxLength: { value: maxLength, message: ErrorMessages.PHONE_PATTERN },
    pattern: {value: Patterns.phone, message: ErrorMessages.PHONE_PATTERN},
    validate: async (value: string) => {
      if (!isNeedAsyncValidation) return
      const isPhoneExist = await AuthenticationApi.verifyPhone({
        code: currentPhonePrefix,
        number: value,
      });
      return isPhoneExist
        ? ErrorMessages.PHONE_EXIST
        : true;
    },
  };
}