import { useRouter } from 'next/router'
import { User } from '../../../user/domain/User'
import styles from './Navbar.module.css'

import { Input } from '../../input/Input'
import { Button } from '../../button/Button'

interface NavbarProps {
    user: User
}

export const Navbar = (props: NavbarProps) => {
    const { user } = props
    const router = useRouter()

    const signOut = () => {
        localStorage.removeItem("token")
        router.push("/")
    }

    return <nav className={styles.navbar}>
        <div>
            <label className={styles.navSysma}>SYSMA</label>
        </div>
        <div>
            <Button className={styles.navbarMenuResponsive}>⁝</Button>
        </div>
        <div className={`${styles.navColumn} ${styles.navMedium}`}>
            <div className={styles.navSearchContent}>
                <Input className={styles.navSearch} placeholder="Search..." />
                <Button className={styles.navSearchButton}>Search</Button>
            </div>
            <div className={styles.navEnd}>
                <label className={styles.navEndItem}>{user.username.toUpperCase()}</label>
                <label className={styles.navEndItem} onClick={signOut}>Sign out</label>
            </div>
        </div>
    </nav>
}