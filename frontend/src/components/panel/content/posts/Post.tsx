import { ChangeEvent, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import styles from "./Post.module.css"

import { Button } from "../../../button/Button"
import { Input } from "../../../input/Input"

export const Posts = () => {
    const [image, setImage] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>()

    useEffect(() => {
        if(!image) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) {
            setImage(null)
            return;
        }

        setImage(event.target.files[0])
    }
    const publish = () => {
    }

    return <div>
        <div className={styles.newPost}>
            <label className={styles.newPostTitle}>Publish post</label>
            <Input placeholder="Title" />
            <textarea className={styles.newPostDescription} placeholder="Description" rows={5} />
            <label className={styles.newPostFile}>
                <input type="file" accept="image/*" onChange={changeImage} />
                {(!image) && <>
                    <FontAwesomeIcon icon={faUpload} style={{marginRight: "1rem"}} />
                    Upload image...
                </> || <img src={preview!} alt={image!.name} />}
            </label>
            <Button>Publish</Button>
        </div>
    </div>
}