import { Catch, ArgumentsHost, HttpServer, Inject } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = 500;

    if (typeof exception === 'object' && !!exception.status) {
      super.catch(exception, host);
      return;
    }

    response
      .status(statusCode)
      .json({
        statusCode,
        error: String(exception),
        timestamp: new Date().toISOString(),
        path: request.url,
      }); 
  }
}
