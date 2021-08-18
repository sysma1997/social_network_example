import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSearch, faUser, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { User } from '../../../user/domain/User'
import styles from './Navbar.module.css'

import { Button } from '../../button/Button'
import { Search } from '../../search/Search'

interface Props {
    user: User
}

export const Navbar = (props: Props) => {
    const { user } = props
    const router = useRouter()

    const [showMenuResponsive, setShowMenuResponsive] = useState<boolean>(false)

    const signOut = () => {
        localStorage.removeItem("token")
        router.push("/login")
    }

    const onClickShowMenuResponsive = () => {
        setShowMenuResponsive(!showMenuResponsive)
    }

    return <nav className={styles.navbar}>
        <div className={styles.navbarTitle}>
            <Link href="/panel/home">
                <label className={styles.navSysma}>SYSMA</label>
            </Link>
            <Button className={styles.navbarMenuResponsive}
                onClick={onClickShowMenuResponsive}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
        </div>
        <div className={`${styles.navMedium} ` +
            `${(showMenuResponsive) && styles.showMenuResponsive}`}>
            <div className={styles.navSearchContent}>
                <Search className={styles.navSearch} placeholder="Search friend..." />
                <Button className={styles.navSearchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <div className={styles.navEnd}>
                <Link href="/panel/profile">
                    <label className={styles.navEndItem}>
                        <FontAwesomeIcon icon={faUser} />
                        {' '}
                        {user.username.toUpperCase()}
                    </label>
                </Link>
                <label className={styles.navEndItem}>
                    <FontAwesomeIcon icon={faBell} />
                    {' '}
                    NOTIFICATIONS
                </label>
                <label className={styles.navEndItem} onClick={signOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    {' '}
                    SIGN OUT
                </label>
            </div>
        </div>
    </nav>
}