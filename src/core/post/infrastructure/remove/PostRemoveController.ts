import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { GetImage } from "../../application/getImage/GetImage";
import { PostGetImageTypeormRepository } from "../getImage/PostGetImageTypeormRepository";
import fs from "fs"
import { PostRemoveTypeormRepository } from "./PostRemoveTypeormRepository";
import { RemovePost } from "../../application/remove/RemovePost";

export class PostRemoveController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.delete("/:id", async (req, res) => {
            const id = req.params.id

            const context = new Context()
            const connection = await context.get()

            const getImageRepository = new PostGetImageTypeormRepository(connection)
            const getImage = new GetImage(getImageRepository)

            let image: string | null = null
            try {
                image = await getImage.init(id)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            if(image) {
                try {
                    fs.unlinkSync(`.${image}`)
                } catch(error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                    return
                }
            }

            const removeRepository = new PostRemoveTypeormRepository(connection)
            const remove = new RemovePost(removeRepository)

            try {
                await remove.init(id)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(200)
        })
    }
}