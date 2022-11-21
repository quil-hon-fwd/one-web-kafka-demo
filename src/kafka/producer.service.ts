import {Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Kafka, Producer, ProducerRecord} from "kafkajs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ProducerService implements OnModuleInit,  OnApplicationShutdown{

    constructor(private readonly configService: ConfigService) {}

    private readonly kafka = new Kafka({
        brokers: [this.configService.get<string>('KAFKA_URL')],
    })

    private readonly producer: Producer = this.kafka.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }


}