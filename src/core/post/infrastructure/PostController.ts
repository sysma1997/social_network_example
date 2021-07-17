import { Router } from "express";
import { Authorize } from "../../shared/infrastructure/authentication/Authorize";
import { PostPublishController } from "./publish/PostPublishController";

const router = Router()

new Authorize(router)

new PostPublishController(router)

export default router