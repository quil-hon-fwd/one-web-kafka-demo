import { Module } from '@nestjs/common';
import { LeadKafkaService } from "./lead.kafka.service";
import { ConfigService } from "@nestjs/config";
import { LeadController } from './lead.controller';

@Module({
  providers: [LeadKafkaService, ConfigService],
  controllers: [LeadController],
  exports: [LeadKafkaService]
})
export class LeadModule { }
