import multer from "multer"

export const UploadSingle = multer({
    storage: multer.memoryStorage()
})