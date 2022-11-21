import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import {ConfigModule} from "@nestjs/config";
import { CubeModule } from './cube/cube.module';

@Module({
  imports: [
      KafkaModule,
      ConfigModule.forRoot({
        envFilePath: ['.kafka.env']
      }),
      CubeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
