import {Injectable} from "@nestjs/common";
import {ProducerService} from "../../kafka/producer.service";

@Injectable()
export class CubeService {
    public constructor(private readonly producerService: ProducerService) {}

    async publishMessage(message: any) {
        // await this.producerService.produce({
        //     topic : "cube",
        //     messages: [
        //         {value: JSON.stringify(message)}
        //     ]
        // })
        //
        await this.producerService.produce(message);
    }
}