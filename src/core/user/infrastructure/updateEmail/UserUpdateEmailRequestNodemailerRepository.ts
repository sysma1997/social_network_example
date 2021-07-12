import { createTransport, Transporter } from "nodemailer";
import { Connection } from "typeorm";
import { UserUpdateEmailRequestRepository } from "../../application/updateEmail/UserUpdateEmailRequestRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import fs from "fs"
import jwt from "jsonwebtoken"
import { MailHtml } from "../../../shared/infrastructure/email/MailHtml";

export class UserUpdateEmailRequestNodemailerRepository implements UserUpdateEmailRequestRepository {
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

    async updateEmailRequest(id: UserId, newEmail: UserEmail): Promise<void> {
        const manager = await this.connection.manager

        const user = await manager.getRepository(UserEntity)
            .createQueryBuilder()
            .where("id = :id AND " + 
                "valid = 1", {
                id: id.value
            })
            .getOne()
        if(user == null) {
            throw new Error("User not found.")
        }

        const key = fs.readFileSync("./private.key").toString()
        const token = jwt.sign({
            id: user.id, 
            newEmail: newEmail.value
        }, key, {
            expiresIn: "1d"
        })

        const html = MailHtml("updateEmail", 
            user.name, 
            `http://localhost:3000/api/user/updateemail/${token}`)
        
        await this.transporter.sendMail({
            from: `"${this.account.name}" <${this.account.user}>`,
            to: newEmail.value, 
            subject: "Update email", 
            html: html
        })
    }
}