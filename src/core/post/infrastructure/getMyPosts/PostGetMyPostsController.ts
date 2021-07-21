import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { GetMyPosts } from "../../application/getMyPosts/GetMyPosts";
import { PostGetMyPostsTypeormRepository } from "./PostGetMyPostsTypeormRepository";

export class PostGetMyPostsController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.get("/myposts", async (_, res) => {
            const context = new Context()
            const connection = await context.get()

            const repository = new PostGetMyPostsTypeormRepository(connection)
            const myPosts = new GetMyPosts(repository)

            try {
                const posts = await myPosts.init(res.locals.userId)

                connection.close()
                res.send(posts)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
            }
        })
    }
}