import { Module } from '@nestjs/common';
import {ProducerService} from "../kafka/producer.service";
import {CubeController} from "./controller/cube.controller";
import {CubeService} from "./service/cube.service";
import {KafkaModule} from "../kafka/kafka.module";

@Module({
    imports: [KafkaModule],
    providers: [CubeService],
    controllers: [CubeController]
})
export class CubeModule {

}
