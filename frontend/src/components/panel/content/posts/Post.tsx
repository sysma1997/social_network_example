import { ChangeEvent, useState, useEffect, EventHandler, KeyboardEvent, TextareaHTMLAttributes } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import styles from "./Post.module.css"

import { Button } from "../../../button/Button"
import { Input } from "../../../input/Input"
import { setErrorStyle, setError, clearError } from "../../../../shared/infrastructure/ValidationInput"
import { UuidValue } from "../../../../shared/domain/UuidValue"
import { Post } from "../../../../post/domain/Post"

interface Props {
    userId: string
}

export const Posts = (props: Props) => {
    const { userId } = props

    const [image, setImage] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>()
    const [title, setTitle] = useState<string>("")
    const [titleBorder, setTitleBorder] = useState<string>("")
    const [titleError, setTitleError] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [descriptionBorder, setDescriptionBorder] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")

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

    const keyDownPublish = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === "Enter") publish()
    }
    const publish = () => {
        const clearAll = () => {
            clearError(setTitleBorder, setTitleError)
            clearError(setDescriptionBorder, setDescriptionError)
        }

        if (title === "" || 
            description === "") {
            if(title === "") setError(setTitleBorder, setTitleError, "Title is required.")
            if(description === "") 
                setError(setDescriptionBorder, setDescriptionError, "Description is required.")
            return
        }
        clearAll()

        const post = new Post(JSON.stringify({
            id: UuidValue.Generate().value, 
            userId: userId, 
            title, 
            description, 
            image: image?.name, 
            date: new Date()
        }))
        console.log(post)
    }

    return <div>
        <div className={styles.newPost}>
            <label className={styles.newPostTitle}>Publish post</label>
            <label className={styles.newPostFile}>
                <input type="file" accept="image/*" onChange={changeImage} />
                {(!image) && <>
                    <FontAwesomeIcon icon={faUpload} style={{marginRight: "1rem"}} />
                    Upload image...
                </> || <img className={styles.newPostImage} src={preview!} alt={image!.name} />}
            </label>
            <Input style={{border: titleBorder}} placeholder="Title" 
                value={title}
                onChange={event => setTitle(event.target.value)} />
            <small style={setErrorStyle}>{titleError}</small>
            <textarea className={styles.newPostDescription} 
                style={{border: descriptionBorder}}
                placeholder="Description" rows={5} 
                value={description} 
                onChange={event => setDescription(event.target.value)} 
                onKeyDown={keyDownPublish} />
            <small style={setErrorStyle}>{descriptionError}</small>
            <Button onClick={publish}>Publish</Button>
        </div>
    </div>
}