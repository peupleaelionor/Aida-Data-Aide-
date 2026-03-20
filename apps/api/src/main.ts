import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })

  app.enableCors({
    origin: [
      process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  const config = new DocumentBuilder()
    .setTitle('AIDA API')
    .setDescription('AIDA — AI Data Aides REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('benefits', 'Benefits discovery')
    .addTag('ai', 'AI advisor')
    .addTag('payments', 'Stripe billing')
    .addTag('analytics', 'Usage analytics')
    .addTag('gdpr', 'GDPR compliance')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  })

  const port = process.env.PORT ?? 3001
  await app.listen(port)
  console.log(`AIDA API running on http://localhost:${port}`)
  console.log(`API docs: http://localhost:${port}/api`)
}

bootstrap()
