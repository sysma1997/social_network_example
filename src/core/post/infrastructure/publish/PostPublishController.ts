import { Router } from "express";
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UploadSingle } from "../../../shared/infrastructure/uploadFiles/UploadSingle";
import { GetImage } from "../../application/getImage/GetImage";
import { PublishPost } from "../../application/publish/PublishPost";
import { PostDto } from "../../domain/PostDto"
import { PostGetImageTypeormRepository } from "../getImage/PostGetImageTypeormRepository";
import { PostPublishTypeormRepository } from "./PostPublishTypeormRepository";
import fs from "fs"

export class PostPublishController {
    readonly router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.post("/", UploadSingle.single("image"), async (req, res) => {
            const body = req.body

            if ((!body.id || typeof (body.id) !== "string") ||
                (!body.title || typeof (body.title) !== "string") ||
                (!body.description || typeof (body.description) !== "string")) {
                let message = ""

                if (!body.id)
                    message += "Id is required.\n"
                else if (typeof (body.id) !== "string")
                    message += "Id not is string.\n"
                if (!body.title)
                    message += "Title is required.\n"
                else if (typeof (body.title) !== "string")
                    message += "Title not is string.\n"
                if (!body.description)
                    message += "Description is required.\n"
                else if (typeof (body.description) !== "string")
                    message += "Description not is string.\n"

                res.status(400).send(message)
                return
            }

            const id: string = body.id
            const userId: string = res.locals.userId
            const title: string = body.title
            const description: string = body.description
            let date: Date = new Date()
            if (body.date && typeof (body.date) === "string")
                date = new Date(body.date)
            let image: string | null = null

            const imageFile = req.file
            if (imageFile) {
                if (imageFile.mimetype !== "image/jpg" &&
                    imageFile.mimetype !== "image/jpeg" &&
                    imageFile.mimetype !== "image/png" &&
                    imageFile.mimetype !== "image/gif") {
                    res.status(400).send("File is not imagen valid. " +
                        "Only types valid (JPEG, PNG, GIF)")
                    return
                }

                const folder = `/public/assets/images/${res.locals.userId}/posts`
                if (!fs.existsSync(`.${folder}`))
                    fs.mkdirSync(`.${folder}`, { recursive: true })

                image = `${folder}/${imageFile.originalname}`
                try {
                    fs.writeFileSync(`.${image}`, imageFile.buffer)
                } catch (error: any) {
                    res.status(400).send(error.toString())
                    return
                }
                image = image.replace("public/", "")
            }

            const context = new Context()
            const connection = await context.get()

            if (body.removeImage) {
                const getImageRepository = new PostGetImageTypeormRepository(connection)
                const getImage = new GetImage(getImageRepository)

                let currentImage: string | null = null
                try {
                    currentImage = await getImage.init(id)
                } catch (error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                    return
                }

                if (currentImage) {
                    try {
                        fs.unlinkSync(`.${currentImage}`)
                    } catch (error: any) {
                        connection.close()
                        res.status(400).send(error.toString())
                        return
                    }
                }
            }

            const postDto = new PostDto(
                id,
                userId,
                title,
                description,
                date,
                image
            )

            const publishRepository = new PostPublishTypeormRepository(connection)
            const publish = new PublishPost(publishRepository)

            try {
                await publish.init(postDto)
            } catch (error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(201)
        })
    }
}