import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage = 'Unexpected error';
    const resBody =
      exception instanceof HttpException ? exception.getResponse() : defaultMessage;

    const normalized =
      typeof resBody === 'string'
        ? { message: resBody }
        : (resBody as { message?: string | string[]; error?: string });

    response.status(status).json({
      error: {
        statusCode: status,
        message: normalized.message ?? defaultMessage,
        details: normalized,
      },
    });
  }
}
