import { Controller, Get, Patch, Delete, Body, Param, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

interface AuthUser { id: string; email: string; role: string }

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser() user: AuthUser) {
    return this.usersService.findById(user.id)
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto)
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List all users (admin)' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findAll(+page, +limit)
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user (admin)' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
