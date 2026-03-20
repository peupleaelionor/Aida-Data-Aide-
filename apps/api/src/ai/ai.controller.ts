import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { IsString, IsArray, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { AiService } from './ai.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

class ChatDto {
  @ApiProperty() @IsString() message!: string
  @ApiProperty({ required: false }) @IsOptional() @IsArray() history?: Array<{ role: string; content: string }>
}

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI benefits advisor' })
  chat(@Body() dto: ChatDto, @CurrentUser() user: { id: string }) {
    const history = (dto.history ?? []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))
    return this.aiService.chat(dto.message, history).then((reply) => ({ reply, userId: user.id }))
  }
}
