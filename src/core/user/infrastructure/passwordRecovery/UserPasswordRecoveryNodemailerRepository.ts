import { createTransport, Transporter } from "nodemailer";
import { UserPasswordRecoveryRepository } from "../../application/passwordRecovery/UserPasswordRecoveryRepository";
import { UserEmail } from "../../domain/UserEmail";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import jwt from "jsonwebtoken"
import { Connection } from "typeorm";
import { MailHtml } from "../../../shared/infrastructure/mail/MailHtml";

export class UserPasswordRecoveryNodemailerRepository implements UserPasswordRecoveryRepository {
    private connection: Connection
    private transporter: Transporter

    constructor(connection: Connection) {
        this.connection = connection

        this.transporter = createTransport({
            service: process.env.NODEMAILER_SERVICE, 
            auth: {
                user: process.env.NODEMAILER_AUTH_USER, 
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })
    }

    async passwordRecovery(email: UserEmail): Promise<void> {
        const manager = this.connection.manager

        const user = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("email = :email AND " + 
                "valid = 1", {
                email: email.value
            })
            .getOne()
        if(user == null) {
            throw new Error("Email not registered.")
        }

        const key = process.env.JSONWEBTOKEN_PRIVATE_KEY as string
        const token = jwt.sign({
            id: user.id, 
            email: user.email
        }, key, {
            expiresIn: "1d"
        })

        const html = MailHtml("recoverPassword", 
            user.name, 
            `http://localhost:3000/${token}/`)

        await this.transporter.sendMail({
            from: `"${process.env.NODEMAILER_NAME}" <${process.env.NODEMAILER_AUTH_USER}>`, 
            to: user.email, 
            subject: "Password recovery", 
            html: html
        })
    }
}