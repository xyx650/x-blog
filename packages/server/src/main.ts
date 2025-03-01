import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { VersioningType } from '@nestjs/common'

import { ResponseInterceptor } from './common/interceptors/response.interceptor'

import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  // 允许 CORS
  const enableCore = configService.get<number>('CORS', 0)
  if (enableCore) app.enableCors()

  // 设置 prefix / version
  const prefix = configService.get<string>('PREFIX') || ''
  const version = configService.get<string>('VERSION') || ''
  app.setGlobalPrefix(prefix)
  if (version) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version.includes(',') ? version.split(',') : version
    })
  }

  app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
