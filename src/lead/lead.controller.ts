import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './lead.entity';
import { LeadKafkaService } from './lead.kafka.service';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadKafkaService: LeadKafkaService) { }

  @Post()
  create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadKafkaService.create(createLeadDto);
  }
}
