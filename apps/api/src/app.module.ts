import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { BenefitsModule } from './benefits/benefits.module'
import { AiModule } from './ai/ai.module'
import { PaymentsModule } from './payments/payments.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { GdprModule } from './gdpr/gdpr.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    BenefitsModule,
    AiModule,
    PaymentsModule,
    AnalyticsModule,
    GdprModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
