import { IsNumber, IsString, IsBoolean, IsEnum, IsOptional, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum EmploymentStatus {
  EMPLOYED = 'employed',
  SELF_EMPLOYED = 'self_employed',
  UNEMPLOYED = 'unemployed',
  RETIRED = 'retired',
  STUDENT = 'student',
  DISABLED = 'disabled',
}

export class UpdateProfileDto {
  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  householdSize?: number

  @ApiProperty({ example: 2500 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyIncome?: number

  @ApiProperty({ enum: EmploymentStatus })
  @IsOptional()
  @IsEnum(EmploymentStatus)
  employmentStatus?: EmploymentStatus

  @ApiProperty({ example: 'US' })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({ example: 'California' })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({ example: 'Los Angeles' })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  hasDisability?: boolean

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  hasChildren?: boolean

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isVeteran?: boolean
}
