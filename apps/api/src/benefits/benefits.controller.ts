import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { BenefitsService } from './benefits.service'
import { CreateBenefitDto } from './dto/create-benefit.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'

@ApiTags('benefits')
@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Get()
  @ApiOperation({ summary: 'List benefits with filters' })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('country') country?: string,
    @Query('category') category?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.benefitsService.findAll({ country, category, page: +page, limit: +limit })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get benefit by ID' })
  findById(@Param('id') id: string) {
    return this.benefitsService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create benefit (admin)' })
  create(@Body() dto: CreateBenefitDto) {
    return this.benefitsService.create(dto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update benefit (admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateBenefitDto>) {
    return this.benefitsService.update(id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete benefit (admin)' })
  delete(@Param('id') id: string) {
    return this.benefitsService.delete(id)
  }
}
