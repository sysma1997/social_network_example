import { Button } from "../../../button/Button"
import { Input } from "../../../input/Input"
import styles from "./Post.module.css"

export const Posts = () => {
    return <div>
        <div className={styles.newPost}>
            <label className={styles.newPostTitle}>Publish post</label>
            <Input placeholder="Title" />
            <textarea className={styles.newPostDescription} placeholder="Description" rows={5} />
            <label className={styles.newPostFile}>
                Upload image
                <input type="file" accept="image/*" />
            </label>
            <Button>Publish</Button>
        </div>
    </div>
}