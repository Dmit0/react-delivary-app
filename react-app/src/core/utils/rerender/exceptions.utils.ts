import { ExceptionHeaders, ExceptionUrls } from '../../enums/exception-headers.enum';

export const checkHeadersForExceptionMatching = (headers: any): boolean => {
  return !!Object.keys(headers).filter(header => ExceptionHeaders.some((exceptionHeader: any) => exceptionHeader === header)).length
}

export const checkUrlsForExcepting = (url?: string) => {
  return (url && ExceptionUrls.some(exceptionUrl => url.includes(exceptionUrl))) || false
}