import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons"
import dayjs from "dayjs"
import styles from "./ProfileUpdate.module.css"

import { User } from "../../../../../user/domain/User"
import { Input } from "../../../../input/Input"
import { Button } from "../../../../button/Button"
import { setErrorStyle, setError, clearError } from "../../../../../shared/infrastructure/ValidationInput"

interface Props {
    close: () => void,
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const ProfileUpdate = (props: Props) => {
    const {
        close,
        user, setUser
    } = props

    const [menu, setMenu] = useState<string>("profile")
    const [hideMenu, setHideMenu] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [nameBorder, setNameBorder] = useState<string>("")
    const [nameError, setNameError] = useState<string>("")
    const [birthday, setBirthday] = useState<Date>(new Date())
    const [gender, setGender] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [usernameBorder, setUsernameBorder] = useState<string>("")
    const [usernameError, setUsernameError] = useState<string>("")

    useEffect(() => {
        setName(user.name)
        setBirthday(user.birthday)
        setGender(user.gender)
        setUsername(user.username)
    }, [])

    const clickDisplay = (menu: string) => setMenu(menu)
    const clickHideMenu = () => setHideMenu(!hideMenu)
    const clickUpdateProfile = () => {
        const clearAll = () => {
            clearError(setNameBorder, setNameError)
            clearError(setUsernameBorder, setUsernameError)
        }

        if (name === "" ||
            username === "") {
            if (name === "") setError(setNameBorder, setNameError, "Name not empty.")
            else clearError(setNameBorder, setNameError)
            if (username === "") setError(setUsernameBorder, setUsernameError, "Username not empty.")
            else clearError(setUsernameBorder, setUsernameError)
        }
        clearAll()
    }

    return <div className={styles.profileUpdate}>
        <div className={styles.panel}>
            <div className={styles.header}>
                <label>Update</label>
                <FontAwesomeIcon className={styles.close} icon={faTimes}
                    onClick={close} />
            </div>
            <div className={styles.body}>
                {(!hideMenu) && <ul className={styles.menu}>
                    <li onClick={() => clickDisplay("profile")}>Profile</li>
                    <li onClick={() => clickDisplay("email")}>Email</li>
                    <li onClick={() => clickDisplay("password")}>Password</li>
                </ul>}
                <div className={styles.content}>
                    {(menu === "profile") && <>
                        <div className={styles.item}>
                            <label>Name</label>
                            <Input type="text" style={{ border: nameBorder }}
                                value={name} onChange={event => setName(event.target.value)} />
                            <small style={setErrorStyle}>{nameError}</small>
                        </div>
                        <div className={styles.item}>
                            <label>Birthday</label>
                            <Input type="date"
                                value={dayjs(birthday).format("YYYY-MM-DD")}
                                onChange={event =>
                                    setBirthday(dayjs(event.target.value, "YYYY-MM-DD").toDate())} />
                        </div>
                        <div className={styles.itemGender}>
                            <label>
                                Male
                                {' '}
                                <Input type="checkbox"
                                    checked={!gender} onChange={event => setGender(event.target.checked)} />
                            </label>
                            <label>
                                Female
                                {' '}
                                <Input type="checkbox"
                                    checked={gender} onChange={event => setGender(event.target.checked)} />
                            </label>
                        </div>
                        <div className={styles.item}>
                            <label>Username</label>
                            <Input type="text" style={{ border: usernameBorder }}
                                value={username} onChange={event => setUsername(event.target.value)} />
                            <label style={setErrorStyle}>{usernameError}</label>
                        </div>
                        <Button onClick={clickUpdateProfile}>Update</Button>
                    </> || (menu === "email") && <>
                        <div className={styles.item}>
                            <label>Update email</label>
                            <Input />
                        </div>
                        <Button>Update</Button>
                    </> || (menu === "password") && <>
                        <div className={styles.item}>
                            <label>Current password</label>
                            <Input />
                        </div>
                        <div className={styles.item}>
                            <label>New password</label>
                            <Input />
                        </div>
                        <div className={styles.item}>
                            <label>Repeat password</label>
                            <Input />
                        </div>
                        <Button>Update</Button>
                    </>}
                    <button className={styles.hideMenu} onClick={clickHideMenu}>
                        <FontAwesomeIcon className={styles.hideMenuIcon}
                            icon={(!hideMenu) ? faChevronLeft : faChevronRight} />
                    </button>
                </div>
            </div>
        </div>
    </div>
}