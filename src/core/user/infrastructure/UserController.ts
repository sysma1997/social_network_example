import { Router } from 'express'
import { Authorize } from '../../shared/infrastructure/authentication/Authorize'
import { UserLoginController } from './login/UserLoginController'
import { UserRegisterController } from './register/UserRegisterController'
import { UserUpdateController } from './update/UserUpdateController'
import { UserValidateAccountController } from './validateAccount/UserValidateAccountController'

const router = Router()

new UserRegisterController(router)
new UserValidateAccountController(router)
new UserLoginController(router)

new Authorize(router)

new UserUpdateController(router)

export default router