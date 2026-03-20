import { Module } from '@nestjs/common'
import { GdprController } from './gdpr.controller'
import { GdprService } from './gdpr.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [GdprController],
  providers: [GdprService],
})
export class GdprModule {}
