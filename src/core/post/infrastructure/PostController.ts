import { Router } from "express";
import { Authorize } from "../../shared/infrastructure/authentication/Authorize";
import { PostPublishController } from "./publish/PostPublishController";
import { PostRemoveController } from "./remove/PostRemoveController";

const router = Router()

new Authorize(router)

new PostPublishController(router)
new PostRemoveController(router)

export default router