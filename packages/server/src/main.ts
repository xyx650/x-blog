import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'

import { AppModule } from './app.module'
import { ResponseInterceptor } from '@/common/interceptors'
import { HttpExceptionFilter } from '@/common/filters'

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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 只允许 DTO 里定义的字段
    forbidNonWhitelisted: true, // 禁止传入 DTO 未定义的字段
    transform: true // 自动转换数据类型
  }))

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
