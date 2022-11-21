import {Body, Controller, Post} from "@nestjs/common";
import {AppService} from "../../app.service";
import {CubeService} from "../service/cube.service";

@Controller()
export class CubeController {
    constructor(private readonly cubeService: CubeService) {}

    @Post("/publish")
    publishMessage(@Body() message: JSON) {
        this.cubeService.publishMessage(message);
    }

}