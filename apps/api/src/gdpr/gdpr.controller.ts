import { Controller, Get, Delete, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { GdprService } from './gdpr.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

class ConsentDto {
  @ApiProperty() @IsString() consentType!: string
  @ApiProperty() @IsBoolean() granted!: boolean
}

@ApiTags('gdpr')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gdpr')
export class GdprController {
  constructor(private readonly gdprService: GdprService) {}

  @Get('export')
  @ApiOperation({ summary: 'Export all user data (GDPR right to access)' })
  exportData(@CurrentUser() user: { id: string }) {
    return this.gdprService.exportUserData(user.id)
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete all user data (GDPR right to erasure)' })
  deleteData(@CurrentUser() user: { id: string }) {
    return this.gdprService.deleteUserData(user.id)
  }

  @Post('consent')
  @ApiOperation({ summary: 'Record consent decision' })
  recordConsent(@Body() dto: ConsentDto, @CurrentUser() user: { id: string }) {
    return this.gdprService.recordConsent(user.id, dto.consentType, dto.granted)
  }
}
