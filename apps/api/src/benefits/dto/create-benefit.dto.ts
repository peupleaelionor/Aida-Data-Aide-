import { IsString, IsBoolean, IsOptional, IsUrl, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum BenefitCategory {
  FOOD = 'food',
  HEALTH = 'health',
  HOUSING = 'housing',
  CHILDCARE = 'childcare',
  DISABILITY = 'disability',
  UNEMPLOYMENT = 'unemployment',
  EDUCATION = 'education',
  TAX = 'tax',
  VETERANS = 'veterans',
  OTHER = 'other',
}

export class CreateBenefitDto {
  @ApiProperty() @IsString() name!: string
  @ApiProperty() @IsString() slug!: string
  @ApiProperty() @IsString() description!: string
  @ApiProperty({ enum: BenefitCategory }) @IsEnum(BenefitCategory) category!: BenefitCategory
  @ApiProperty() @IsString() country!: string
  @ApiProperty({ required: false }) @IsOptional() @IsString() state?: string
  @ApiProperty() @IsString() amount!: string
  @ApiProperty({ default: 'USD' }) @IsString() currency!: string
  @ApiProperty() @IsString() eligibilitySummary!: string
  @ApiProperty({ required: false }) @IsOptional() @IsUrl() applicationUrl?: string
  @ApiProperty({ default: true }) @IsBoolean() isActive!: boolean
}
