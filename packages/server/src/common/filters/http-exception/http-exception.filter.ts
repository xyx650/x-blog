import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter<T = unknown> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let code: number = HttpStatus.INTERNAL_SERVER_ERROR

    let message = 'Internal Server Error'

    if (exception instanceof HttpException) {
      code = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse) {
        message = (exceptionResponse as { message?: string }).message || message
      }
    }


    response.status(code).json({
      code,
      message,
      time: new Date().toLocaleString(undefined, { hourCycle: 'h24' }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: exception['name']
    })
  }
}
