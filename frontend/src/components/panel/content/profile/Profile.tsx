import styles from "./Profile.module.css"

import { User } from "../../../../user/domain/User";
import { ImageProfile } from "../../../imageProfile/ImageProfile";
import { Posts } from "../posts/Posts";

interface Props {
    user: User
}

export const Profile = (props: Props) => {
    const { user } = props

    return <div className={styles.profile}>
        <ImageProfile user={user} className={styles.imageProfile} />
        <label className={styles.name}>{user.name}</label>
        <Posts user={user} />
    </div>
}