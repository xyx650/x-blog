import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import type { Request } from 'express'

const methodMessageMap = {
  GET: 'Response successfully',
  POST: 'Response successfully',
  PUT: 'Updated successfully',
  PATCH: 'Updated successfully',
  DELETE: 'Deleted successfully'
}

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method } = context.switchToHttp().getRequest<Request>()
    return next.handle().pipe(
      map((data: T) => {
        return {
          code: 0,
          data,
          message: (methodMessageMap[method] || 'Response successfully') as string
        }
      })
    )
  }
}
