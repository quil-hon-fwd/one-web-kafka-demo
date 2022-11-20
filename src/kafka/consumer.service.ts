import {Injectable, OnApplicationShutdown} from "@nestjs/common";
import {Consumer, ConsumerRunConfig, Kafka} from "kafkajs";
import {ConsumerSubscribeTopics} from "@nestjs/microservices/external/kafka.interface";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

    async onApplicationShutdown(signal?: string) {
        for(const consumer of this.consumer) {
            await consumer.disconnect();
        }
    }
    private readonly kafka = new Kafka({
        brokers: ['localhost:29092'],
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