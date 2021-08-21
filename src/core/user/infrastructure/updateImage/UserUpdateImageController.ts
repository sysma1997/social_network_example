import { Router } from "express";
import fs from "fs"
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UserUpdateImageTypeormRepository } from "./UserUpdateImageTypeormRepository";
import { UpdateImage } from "../../application/updateImage/UpdateImage";
import { UserGetImageTypeormRepository } from "./UserGetImageTypeormRepository";
import { GetImage } from "../../application/updateImage/GetImage";
import { UploadSingle } from "../../../shared/infrastructure/uploadFiles/UploadSingle";

export class UserUpdateImageController {
    private router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/updateimage", UploadSingle.single("image"), async (req, res) => {
            const imageFile = req.file

            if (!imageFile) {
                res.status(400).send("Image is required.")
                return
            }
            if (imageFile.mimetype !== "image/jpg" &&
                imageFile.mimetype !== "image/jpeg" &&
                imageFile.mimetype !== "image/png" &&
                imageFile.mimetype !== "image/gif") {
                res.status(400).send("File is not imagen valid. " +
                    "Only types valid (JPEG, PNG, GIF)")
                return
            }

            const context = new Context()
            const connection = await context.get()

            const getImageRepository = new UserGetImageTypeormRepository(connection)
            const getImage = new GetImage(getImageRepository)

            let image: string | null = null

            let isImage = await getImage.init(res.locals.userId)
            if (isImage) {
                try {
                    image = `/public${isImage}`
                } catch (error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                    return
                }
            }

            if (image) {
                try {
                    fs.unlinkSync(`.${image}`)
                } catch (error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                    return
                }
            }

            const folder = `/public/assets/images/${res.locals.userId}/profile`
            if (!fs.existsSync(`.${folder}`))
                fs.mkdirSync(`.${folder}`, { recursive: true })

            image = `${folder}/${imageFile.originalname}`
            try {
                fs.writeFileSync(`.${image}`, imageFile.buffer)
            } catch (error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }
            image = image.replace("public/", "")

            const updateImageRepository = new UserUpdateImageTypeormRepository(connection)
            const updateImage = new UpdateImage(updateImageRepository)

            try {
                await updateImage.init(res.locals.userId, image)
            } catch (error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            connection.close()
            res.sendStatus(200)
        })
    }
}