import { Router } from "express";
import multer from "multer"
import fs from "fs"
import { Context } from "../../../shared/infrastructure/storage/Context";
import { UserUpdateImageTypeormRepository } from "./UserUpdateImageTypeormRepository";
import { UpdateImage } from "../../application/updateImage/UpdateImage";
import { UserGetImageTypeormRepository } from "./UserGetImageTypeormRepository";
import { GetImage } from "../../application/updateImage/GetImage";

const upload = multer({
    storage: multer.memoryStorage()
})

export class UserUpdateImageController {
    private router: Router

    constructor(router: Router) {
        this.router = router

        this.init()
    }

    private init() {
        this.router.put("/updateimage", upload.single("image"), async (req, res) => {
            const image = req.file

            if(!image) {
                res.status(400).send("Image is required.")
                return
            }
            if (image.mimetype !== "image/jpg" && 
                image.mimetype !== "image/jpeg" && 
                image.mimetype !== "image/png" && 
                image.mimetype !== "image/gif") {
                res.status(400).send("File is not imagen valid. " + 
                    "Only types valid (JPEG, PNG, GIF)")
                return
            }

            const context = new Context()
            const connection = await context.get()

            const getImageRepository = new UserGetImageTypeormRepository(connection)
            const getImage = new GetImage(getImageRepository)

            let imageProfile: string | undefined = ""
            try {
                imageProfile = await getImage.init(res.locals.userId)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            if(imageProfile != null) {
                try {
                    fs.unlinkSync(`.${imageProfile}`)
                } catch(error: any) {
                    connection.close()
                    res.status(400).send(error.toString())
                }
            }

            const folder = `/public/assets/images/${res.locals.userId}/profile`
            if(!fs.existsSync(`.${folder}`)) 
                fs.mkdirSync(`.${folder}`, { recursive: true })
            
            imageProfile = `${folder}/${image.originalname}`
            try {
                fs.writeFileSync(`.${imageProfile}`, image.buffer/* , "ascii" */)
            } catch(error: any) {
                connection.close()
                res.status(400).send(error.toString())
                return
            }

            const updateImageRepository = new UserUpdateImageTypeormRepository(connection)
            const updateImage = new UpdateImage(updateImageRepository)

            try {
                await updateImage.init(res.locals.userId, imageProfile)
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