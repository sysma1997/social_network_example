import { createTransport, Transporter } from "nodemailer";
import { UserSendMailRepository } from "../../application/register/UserSendMailRepository";
import { UserId } from "../../domain/UserId";
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { UserEmail } from "../../domain/UserEmail";

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
    
    async sendMail(id: UserId, email: UserEmail): Promise<void> {
        const key = fs.readFileSync("./private.key").toString()
        const token = jwt.sign({
            id: id.value, 
            email: email.value
        }, key, {
            expiresIn: '1d'
        })

        await this.transporter.sendMail({
            from: `"${this.account.name}" <${this.account.user}>`, 
            to: email.value, 
            subject: "Welcome to 'sysma_social_network_example_api'", 
            html: `<h4>${token}</h4>`
        })
    }
}