import { BadRequestException, ForbiddenException, NotAcceptableException } from '@nestjs/common';

export class exceptionErrors {
  static throwForbiddenError(message: string) {
    throw new ForbiddenException(message);
  }

  static badRequestException(message: string) {
    throw new BadRequestException(message);
  }

  static mongoDbError(message: string) {
    throw new NotAcceptableException(message);
  }
}