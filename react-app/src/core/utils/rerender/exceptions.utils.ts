import { ExceptionHeaders } from '../../enums/exception-headers.enum';

export const checkHeadersForExceptionMatching = (headers: any): boolean => {
  return !!Object.keys(headers).filter(header => ExceptionHeaders.some((exceptionHeader: any) => exceptionHeader === header)).length
}