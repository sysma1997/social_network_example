import 'reflect-metadata'
import { createConnection } from 'typeorm'

export class Context {
    async get() {
        return await createConnection({
            type: 'sqlite',
            database: `${__dirname}\\database.db`,
            entities: [`${__dirname}\\entities\\*.ts`],
            synchronize: true, 
            logging: "all"
        })
    }
}