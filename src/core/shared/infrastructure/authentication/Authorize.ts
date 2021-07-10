import { Request, Router } from "express";
import jwt from "jsonwebtoken"
import fs from "fs"

class Auth {
    readonly type: string
    readonly token: string

    constructor(type: string, 
        token: string) {
        this.type = type
        this.token = token
    }
}

export class Authorize {
    private router: Router

    constructor(router: Router) {
        this.router = router 

        this.init()
    }

    private init() {
        this.router.use(async (req, res, next) => {
            if(!req.headers["authorization"]) {
                res.sendStatus(401)
                return
            }

            const headerResult = req.headers["authorization"].split(" ")
            const auth = new Auth(headerResult[0], headerResult[1])

            if(auth.type !== "Bearer") {
                res.status(401).send(`Type '${auth.type}' not valid. It's only valid 'Bearer'`)
                return
            }

            const key = fs.readFileSync("./private.key").toString()
            jwt.verify(auth.token, key, (error, decode) => {
                if(error) {
                    res.status(401).send(error.message)
                    return
                }

                res.locals.userId = (<any>decode).id
                next()
            })
        })
    }
}