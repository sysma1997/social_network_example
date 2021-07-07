import { Router } from 'express'
import { UserLoginController } from './login/UserLoginController'
import { UserRegisterController } from './register/UserRegisterController'
import { UserValidateAccountController } from './validateAccount/UserValidateAccountController'

const router = Router()

const registerController = new UserRegisterController(router)
const validateAccountController = new UserValidateAccountController(router)
const loginController = new UserLoginController(router)

export default router