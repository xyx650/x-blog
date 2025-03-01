import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          code: 0,
          data,
          message: 'Response successfully'
        }
      })
    )
  }
}
