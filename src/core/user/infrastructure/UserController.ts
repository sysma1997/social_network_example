import { Router } from 'express'
import { Authorize } from '../../shared/infrastructure/authentication/Authorize'
import { UserFindController } from './find/UserFindController'
import { UserGetController } from './get/UserGetController'
import { UserLoginController } from './login/UserLoginController'
import { UserPasswordRecoveryController } from './passwordRecovery/UserPasswordRecoveryController'
import { UserUpdateNewPasswordController } from './passwordRecovery/UserUpdateNewPasswordController'
import { UserRegisterController } from './register/UserRegisterController'
import { UserUpdateController } from './update/UserUpdateController'
import { UserUpdateEmailController } from './updateEmail/UserUpdateEmailController'
import { UserUpdateEmailRequestController } from './updateEmail/UserUpdateEmailRequestController'
import { UserUpdateImageController } from './updateImage/UserUpdateImageController'
import { UserUpdatePasswordController } from './updatePassword/UserUpdatePasswordController'
import { UserValidateAccountController } from './validateAccount/UserValidateAccountController'

const router = Router()

new UserRegisterController(router)
new UserValidateAccountController(router)
new UserLoginController(router)
new UserPasswordRecoveryController(router)
new UserUpdateNewPasswordController(router)
new UserUpdateEmailController(router)

new Authorize(router)

new UserUpdateController(router)
new UserUpdateEmailRequestController(router)
new UserUpdatePasswordController(router)
new UserGetController(router)
new UserFindController(router)
new UserUpdateImageController(router)

export default router