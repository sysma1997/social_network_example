import { createTransport, Transporter } from "nodemailer";
import { UserSendMailRepository } from "../../application/register/UserSendMailRepository";
import { User } from "../../domain/User";
import jwt from "jsonwebtoken"
import { MailHtml } from "../../../shared/infrastructure/mail/MailHtml"

export class UserSendMailNodemailerRepository implements UserSendMailRepository {
    private transporter: Transporter

    constructor() {
        this.transporter = createTransport({
            service: process.env.NODEMAILER_SERVICE,
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })
    }

    async sendMail(user: User): Promise<void> {
        const key = process.env.JSONWEBTOKEN_PRIVATE_KEY as string
        const token = jwt.sign({
            id: user.id.value,
            email: user.email.value
        }, key, {
            expiresIn: "1d"
        })

        const html = MailHtml("register",
            user.name.value,
            `${process.env.FRONTEND}/user/validate/${token}`)

        await this.transporter.sendMail({
            from: `"${process.env.NODEMAILER_NAME}" <${process.env.NODEMAILER_AUTH_USER}>`,
            to: user.email.value,
            subject: "SYSMA SOCIAL NETWORK",
            html: html
        }, (error, _) => {
            if (error) {
                throw new Error(error.message)
            }
        })
    }
}