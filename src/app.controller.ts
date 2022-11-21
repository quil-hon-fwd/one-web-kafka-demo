import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {CubeController} from "./cube/controller/cube.controller";
import {CubeService} from "./cube/service/cube.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
