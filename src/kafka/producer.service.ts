import {Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Kafka, Producer, ProducerRecord} from "kafkajs";
import {ConfigService} from "@nestjs/config";
import {avdlToAVSCAsync, SchemaRegistry, SchemaType} from "@kafkajs/confluent-schema-registry";
import * as path from "path";

@Injectable()
export class ProducerService implements OnModuleInit,  OnApplicationShutdown{

    constructor(private readonly configService: ConfigService) {}

    private readonly kafka = new Kafka({
        brokers: [this.configService.get<string>('KAFKA_URL')],
    })

    private readonly registry = new SchemaRegistry({
        host: 'http://localhost:8085'
    })

    private readonly producer: Producer = this.kafka.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce(record: any) {
        const schema = await avdlToAVSCAsync(path.join(__dirname, 'schema.avdl'))
        const { id } = await this.registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })

        const outgoingMessage = {
            value: await this.registry.encode(id, record)
        }

        await this.producer.send({
            topic: 'cube',
            messages: [outgoingMessage]
        });
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }


}