import { createTransport, Transporter } from "nodemailer";
import { UserPasswordRecoveryRepository } from "../../application/passwordRecovery/UserPasswordRecoveryRepository";
import { UserEmail } from "../../domain/UserEmail";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import fs from "fs"
import jwt from "jsonwebtoken"
import { Connection } from "typeorm";
import { MailHtml } from "../../../shared/infrastructure/email/MailHtml";

export class UserPasswordRecoveryNodemailerRepository implements UserPasswordRecoveryRepository {
    private connection: Connection
    private account: any
    private transporter: Transporter

    constructor(connection: Connection) {
        this.connection = connection

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

        const key = fs.readFileSync("./private.key").toString()
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
            from: `"${this.account.name}" <${this.account.user}>`, 
            to: user.email, 
            subject: "Password recovery", 
            html: html
        })
    }
}