import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEllipsisV,
    faUpload
} from "@fortawesome/free-solid-svg-icons"
import {
    faHeart as farHeart,
    faCommentDots as farCommentDots,
    faNewspaper
} from '@fortawesome/free-regular-svg-icons'
import styles from "./Post.module.css"

import { Button } from "../../../button/Button"
import { ImageProfile } from "../../../imageProfile/ImageProfile"
import { Input } from "../../../input/Input"
import { setErrorStyle, setError, clearError } from "../../../../shared/infrastructure/ValidationInput"
import { UuidValue } from "../../../../shared/domain/UuidValue"
import { Post } from "../../../../post/domain/Post"
import { Http } from "../../../../shared/infrastructure/Http"
import { User } from "../../../../user/domain/User"
import { GetMyPostsApiRepository } from "../../../../post/infrastructure/getMyPosts/GetMyPostsApiRepository"
import { GetMyPosts } from "../../../../post/application/getMyPosts/GetMyPosts"
import { PostPublishApiRepository } from "../../../../post/infrastructure/publish/PostPublishApiRepository"
import { PublishPost } from "../../../../post/application/publish/PublishPost"

interface Props {
    user: User
}

export const Posts = (props: Props) => {
    const { user } = props

    const [isPublish, setIsPublish] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>()
    const [title, setTitle] = useState<string>("")
    const [titleBorder, setTitleBorder] = useState<string>("")
    const [titleError, setTitleError] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [descriptionBorder, setDescriptionBorder] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")

    const [posts, setPosts] = useState<Array<Post>>(new Array<Post>())

    useEffect(() => {
        loadPosts()
    }, [])
    useEffect(() => {
        if (!image) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const loadPosts = async () => {
        const repository = new GetMyPostsApiRepository()
        const getMyPosts = new GetMyPosts(repository)

        try {
            setPosts(await getMyPosts.init())
        } catch (error: any) {
            alert(error.toString())
        }
    }

    const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setImage(null)
            return;
        }

        setImage(event.target.files[0])
    }

    const keyDownPublish = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") publish()
    }
    const publish = async () => {
        const clearAll = () => {
            clearError(setTitleBorder, setTitleError)
            clearError(setDescriptionBorder, setDescriptionError)
        }

        if (title === "" ||
            description === "") {
            if (title === "") setError(setTitleBorder, setTitleError, "Title is required.")
            if (description === "")
                setError(setDescriptionBorder, setDescriptionError, "Description is required.")
            return
        }
        clearAll()

        let post = new Post(
            UuidValue.Generate(),
            user.id,
            title,
            description,
            new Date(),
            null,
            user
        )

        const repository = new PostPublishApiRepository()
        const publish = new PublishPost(repository)

        try {
            if (await publish.init(
                post.id,
                user.id,
                title,
                description,
                new Date(),
                image!
            )) {
                if (image) {
                    post = new Post(
                        post.id,
                        user.id,
                        title,
                        description,
                        post.date,
                        `/assets/images/${user.id.value}/posts/${image.name}`,
                        user
                    )
                }

                const newPost = posts.concat()
                newPost.unshift(post)
                setPosts(newPost)

                setImage(null)
                setTitle("")
                setDescription("")
                setIsPublish(false)
            }
        } catch (error: any) {
            setMessageError(error.toString())
        }
    }

    return <div className={styles.posts}>
        {(isPublish) && <div className={styles.newPost}>
            <label className={styles.newPostTitle}>Publish post</label>
            <label className={styles.newPostFile}>
                <input type="file" accept="image/*" onChange={changeImage} />
                {(!image) && <>
                    <FontAwesomeIcon icon={faUpload} style={{ marginRight: "1rem" }} />
                    Upload image...
                </> || <img className={styles.newPostImage} src={preview!} alt={image!.name} />}
            </label>
            <Input style={{ border: titleBorder }} placeholder="Title"
                value={title}
                onChange={event => setTitle(event.target.value)} />
            <small style={setErrorStyle}>{titleError}</small>
            <textarea className={styles.newPostDescription}
                style={{ border: descriptionBorder }}
                placeholder="Description" rows={5}
                value={description}
                onChange={event => setDescription(event.target.value)}
                onKeyDown={keyDownPublish} />
            <small style={setErrorStyle}>{descriptionError}</small>
            <label style={{ ...setErrorStyle, textAlign: "center" }}>
                <b dangerouslySetInnerHTML={{ __html: messageError }}></b>
            </label>
            <div className={styles.newPostButtons}>
                <Button onClick={() => setIsPublish(false)}>Cancel</Button>
                <Button onClick={publish}>Publish</Button>
            </div>
        </div> || <Button className={styles.newPostShowPublish}
            onClick={() => setIsPublish(true)}>
                Publish post
            </Button>}

        <div className={styles.separator}>
            <hr />
            <label><FontAwesomeIcon icon={faNewspaper} /></label>
            <hr />
        </div>

        <div className={styles.list}>
            {(posts) && (posts.length > 0) && posts.map(post => <div key={post.id.value}
                className={styles.item}>
                <div className={styles.itemHeader}>
                    <ImageProfile user={post.user} className={styles.itemImageProfile} />
                    <div className={styles.itemHeaderInformation}>
                        <a className={styles.itemHeaderInformationName} href="#">
                            {post.user!.name}
                        </a>
                        <small className={styles.itemHeaderInformationDate}>
                            {post.date.toLocaleDateString()}
                            {' '}
                            {post.date.toLocaleTimeString()}
                        </small>
                    </div>
                    <Button>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Button>
                </div>
                <label className={styles.itemTitle}>{post.title}</label>
                <p >{post.description}</p>
                {(post.image) && <img className={styles.itemImage}
                    src={`${process.env.API}${post.image}`}
                    alt={post.image} />}
                <div className={styles.itemInteractions}>
                    <label>
                        <FontAwesomeIcon className={styles.itemInteraction} icon={farHeart} />
                        {0}
                    </label>
                    <label>
                        <FontAwesomeIcon className={styles.itemInteraction} icon={farCommentDots} />
                        {0}
                    </label>
                </div>
            </div>)}
        </div>
    </div>
}