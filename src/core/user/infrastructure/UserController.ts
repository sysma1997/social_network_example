import { Router } from 'express'
import { UserRegisterController } from './register/UserRegisterController'
import { UserValidateAccountController } from './validateAccount/UserValidateAccountController'

const router = Router()

const registerController = new UserRegisterController(router)
const validateAccountController = new UserValidateAccountController(router)

export default router