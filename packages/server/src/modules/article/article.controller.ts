import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common'

@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
}
