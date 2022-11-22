import { readFileSync } from 'fs';
import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { ConfigService } from "@nestjs/config";
import { SchemaRegistry, SchemaType, readAVSC } from "@kafkajs/confluent-schema-registry";
import * as path from "path";
import { Lead } from "./lead.entity";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Injectable()
export class LeadKafkaService implements OnModuleInit, OnApplicationShutdown {

  constructor(private readonly configService: ConfigService) { }

  private readonly kafka = new Kafka({
    brokers: this.configService.get<string>('KAFKA_BROKERS').split(','),
    ssl: {
      rejectUnauthorized: false,
      ca: this.configService.get<string>('KAFKA_EXTRA_CA_CERTS').split(',').map((p: string) => readFileSync(p, 'utf-8')),
    },
    sasl: {
      mechanism: 'plain',
      username: this.configService.get<string>('KAFKA_USERNAME'),
      password: this.configService.get<string>('KAFKA_PASSWORD'),
    }
  })

  private readonly registry = new SchemaRegistry({
    host: this.configService.get<string>('SCHEMA_REGISTRY_URL')
  })

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async create(leadDto: CreateLeadDto) {
    //const schema = readAVSC(path.join(__dirname, 'lead.schema.avsc'))
    const schema = readAVSC('/tmp/lead.schema.avsc')
    const { id } = await this.registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })

    const lead = new Lead(leadDto)

    const outgoingMessage = {
      value: await this.registry.encode(id, lead)
    }

    await this.producer.send({
      topic: this.configService.get<string>('KAFKA_LEAD_TOPIC'),
      messages: [outgoingMessage]
    });

    return lead;
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
