import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch()
export class HttpExceptionFilter<T = unknown> implements ExceptionFilter {

  private readonly logger = new Logger('HttpExceptionFilter')

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR

    let code: number = HttpStatus.INTERNAL_SERVER_ERROR

    let message = 'Internal Server Error'

    if (exception instanceof HttpException) {
      statusCode = code = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse) {
        message = (exceptionResponse as { message?: string }).message || message
      }
    }
    if (exception instanceof QueryFailedError) {
      message = exception['message']
      code = exception['errno'] as number
    }

    this.logger.error(message, exception)
    response.status(statusCode).json({
      code,
      message,
      time: new Date().toLocaleString(undefined, { hourCycle: 'h24' }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: exception['name']
    })
  }
}
