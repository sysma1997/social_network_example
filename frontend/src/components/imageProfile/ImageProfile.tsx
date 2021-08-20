import { CSSProperties } from "react";
import styles from "./imageProfile.module.css"

import { User } from "../../user/domain/User";

interface Props {
    user: User, 
    className?: string, 
    style?: CSSProperties
}

export const ImageProfile = (props: Props) => {
    const { image, username } = props.user

    return (image) && 
        <img className={`${styles.profileImage} ${props.className}`} 
            style={props.style}
            src={`${process.env.API}${image}`}
            alt={username} /> ||
        <label className={`${styles.profileInitial} ${props.className}`}
            style={props.style}>
            {(username) && username[0].toUpperCase() || "..."}
        </label>
}