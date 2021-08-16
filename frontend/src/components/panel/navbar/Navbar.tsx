import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { User } from '../../../user/domain/User'
import styles from './Navbar.module.css'

import { Input } from '../../input/Input'
import { Button } from '../../button/Button'

interface Props {
    user: User
}

export const Navbar = (props: Props) => {
    const { user } = props
    const router = useRouter()

    const [showMenuResponsive, setShowMenuResponsive] = useState<boolean>(false)

    const signOut = () => {
        localStorage.removeItem("token")
        router.push("/")
    }

    const onClickShowMenuResponsive = () => {
        setShowMenuResponsive(!showMenuResponsive)
    }

    return <nav className={styles.navbar}>
        <div className={styles.navbarTitle}>
            <label className={styles.navSysma}>SYSMA</label>
            <Button className={styles.navbarMenuResponsive}
                onClick={onClickShowMenuResponsive}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
        </div>
        <div className={`${styles.navMedium} ` +
            `${(showMenuResponsive) && styles.showMenuResponsive}`}>
            <div className={styles.navSearchContent}>
                <Input className={styles.navSearch} placeholder="Search..." />
                <Button className={styles.navSearchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <div className={styles.navEnd}>
                <label className={styles.navEndItem}>{user.username.toUpperCase()}</label>
                <label className={styles.navEndItem} onClick={signOut}>Sign out</label>
            </div>
        </div>
    </nav>
}