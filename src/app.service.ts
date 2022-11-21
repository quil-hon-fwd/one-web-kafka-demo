import { Injectable } from '@nestjs/common';
import {ProducerService} from "./kafka/producer.service";

@Injectable()
export class AppService {

  constructor(private readonly producerService: ProducerService) {
  }
  getHello(): string {
    return 'Hello World!';
  }

  async publishMessage(message: any) {
    await this.producerService.produce({
      topic : "cube",
      messages: [
        {value: JSON.stringify(message)}
      ]
    })
  }
}
