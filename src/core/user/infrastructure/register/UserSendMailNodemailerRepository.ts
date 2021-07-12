import { createTransport, Transporter } from "nodemailer";
import { UserSendMailRepository } from "../../application/register/UserSendMailRepository";
import { User } from "../../domain/User";
import fs from "fs"
import jwt from "jsonwebtoken"
import { MailHtml } from "../../../shared/infrastructure/email/MailHtml"

export class UserSendMailNodemailerRepository implements UserSendMailRepository {
    private account: any
    private transporter: Transporter

    constructor() {
        const stringAccount = fs.readFileSync("./account.json").toString()
        this.account = JSON.parse(stringAccount)
        this.transporter = createTransport({
            service: "Gmail", 
            auth: {
                user: this.account.user, 
                pass: this.account.pass
            }
        })
    }

    async sendMail(user: User): Promise<void> {
        const key = fs.readFileSync("./private.key").toString()
        const token = jwt.sign({
            id: user.id.value,
            email: user.email.value
        }, key, {
            expiresIn: "1d"
        })

        const html = MailHtml("register", 
            user.name.value, 
            `http://localhost:3000/api/user/validate/${token}`)

        await this.transporter.sendMail({
            from: `"${this.account.name}" <${this.account.user}>`, 
            to: user.email.value, 
            subject: "SYSMA SOCIAL NETWORK", 
            html: html
        }).catch(error => {
            throw new Error(error)
        })
    }
}