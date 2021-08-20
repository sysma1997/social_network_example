import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen, faUser, faUserFriends, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import styles from "./Profile.module.css"

import { User } from "../../../../user/domain/User";
import { ImageProfile } from "../../../imageProfile/ImageProfile";
import { Posts } from "../posts/Posts";
import { Button } from "../../../button/Button";
import { UserUpdateImageApiRepository } from "../../../../user/infrastructure/updateImage/UserUpdateImageApiRepository";
import { UpdateImageUser } from "../../../../user/application/updateImage/UpdateImageUser";

interface Props {
    user: User, 
    setUser: Dispatch<SetStateAction<User>>
}

export const Profile = (props: Props) => {
    const { user, setUser } = props

    const changeUpdateImageProfile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0]
        const repository = new UserUpdateImageApiRepository()
        const updateImage = new UpdateImageUser(repository)

        if(await updateImage.init(image)) {
            const urlImage = URL.createObjectURL(image)
            const userUpdate = new User(
                user.id, 
                user.name, 
                user.birthday, 
                user.gender, 
                user.email, 
                user.username, 
                user.password, 
                user.valid, 
                urlImage
            )
            
            setUser(userUpdate)
            URL.revokeObjectURL(urlImage)
        }
    }
    const clickEditProfile = () => {
        console.log(user)
    }

    return <div>
        <div className={styles.header}>
            <label className={styles.headerImage}>
                <ImageProfile user={user} className={styles.headerImageProfile} />
                <FontAwesomeIcon className={styles.headerImageProfileEdit} icon={faPen} />
                <input type="file" accept="image/*" onChange={changeUpdateImageProfile} />
            </label>
            <label className={styles.headerUsername}>
                {(user.username) && user.username}
            </label>
        </div>
        <div className={styles.body}>
            <div className={styles.bodyInformation}>
                <div className={styles.bodyInformationCard}>
                    <label className={styles.bodyInformationCardTitle}>Information</label>
                    
                    <label className={styles.bodyInformationCardText}>
                        <FontAwesomeIcon className={styles.bodyInformationCardIcon} icon={faUser} />
                        {user.name}
                    </label>
                    <label className={styles.bodyInformationCardText}>
                        <FontAwesomeIcon className={styles.bodyInformationCardIcon} icon={faBirthdayCake} />
                        {dayjs(user.birthday).format("DD/MM/YYYY")}
                    </label>
                    <label className={styles.bodyInformationCardText}>
                        <FontAwesomeIcon className={styles.bodyInformationCardIcon} icon={faVenusMars} />
                        {(user.gender) ? 'Female' : 'Male'}
                    </label>
                    <label className={styles.bodyInformationCardText}>
                        <FontAwesomeIcon className={styles.bodyInformationCardIcon} icon={faUserFriends} />
                        {0}
                    </label>
                    <label className={styles.bodyInformationCardText}>
                        <FontAwesomeIcon className={styles.bodyInformationCardIcon} icon={faNewspaper} />
                        {0}
                    </label>

                    <Button onClick={clickEditProfile}>Edit</Button>
                </div>
            </div>
            <div className={styles.bodyPosts}>
                <Posts user={user} />
            </div>
        </div>
    </div>
}