import {Injectable, OnApplicationShutdown} from "@nestjs/common";
import {Consumer, ConsumerRunConfig, Kafka} from "kafkajs";
import {ConsumerSubscribeTopics} from "@nestjs/microservices/external/kafka.interface";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

    constructor(private readonly configService: ConfigService) {}

    async onApplicationShutdown(signal?: string) {
        for(const consumer of this.consumer) {
            await consumer.disconnect();
        }
    }
    private readonly kafka = new Kafka({
        brokers: [this.configService.get<string>('KAFKA_URL')],
    })

    private readonly consumer: Consumer[] = [];

    async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({groupId: 'cube'})

        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumer.push(consumer);


    }
}