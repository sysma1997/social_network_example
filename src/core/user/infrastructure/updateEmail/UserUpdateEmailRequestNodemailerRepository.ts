import { createTransport, Transporter } from "nodemailer";
import { Connection } from "typeorm";
import { UserUpdateEmailRequestRepository } from "../../application/updateEmail/UserUpdateEmailRequestRepository";
import { User as UserEntity } from "../../../shared/infrastructure/storage/entities/User"
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import jwt from "jsonwebtoken"
import { MailHtml } from "../../../shared/infrastructure/mail/MailHtml";

export class UserUpdateEmailRequestNodemailerRepository implements UserUpdateEmailRequestRepository {
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

        const key = process.env.JSONWEBTOKEN_PRIVATE_KEY as string
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
            from: `"${process.env.NODEMAILER_NAME}" <${process.env.NODEMAILER_AUTH_USER}>`, 
            to: newEmail.value, 
            subject: "Update email", 
            html: html
        })
    }
}