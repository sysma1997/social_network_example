import { Router } from 'express'
import { UserRegisterController } from './register/UserRegisterController'

const router = Router()

const registerController = new UserRegisterController(router)

router.use("/", registerController.router)

export default router