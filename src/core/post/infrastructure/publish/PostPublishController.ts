import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { PublishPost } from "../../application/publish/PublishPost";
import { PostDto } from "../../domain/PostDto"
import { PostPublishTypeormRepository } from "./PostPublishTypeormRepository";

export class PostPublishController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.post("/", async (req, res) => {
            const body = req.body

            if ((!body.id || typeof(body.id) !== "string") || 
                (!body.title || typeof(body.title) !== "string") || 
                (!body.description || typeof(body.description) !== "string")) {
                let message = ""

                if(!body.id) 
                    message += "Id is required.\n"
                else if(typeof(body.id)) 
                    message += "Id not is string.\n"
                if(!body.title) 
                    message += "Title is required.\n"
                else if(typeof(body.title) !== "string") 
                    message += "Title not is string.\n"
                if(!body.description) 
                    message += "Description is required."
                else if(typeof(body.description) !== "string") 
                    message += "Description not is string."
                
                res.status(400).send(message)
                return
            }

            const id: string = body.id
            const userId: string = res.locals.userId
            const title: string = body.title
            const description: string = body.description
            let date: Date = new Date()
            if(body.date && typeof(body.date) === "string") 
                date = new Date(body.date)
            
            const postDto = new PostDto(
                id, 
                userId, 
                title, 
                description, 
                date
            )

            const context = new Context()
            const connection = await context.get()

            const repository = new PostPublishTypeormRepository(connection)
            const publish = new PublishPost(repository)

            try {
                await publish.init(postDto)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(201)
        })
    }
}