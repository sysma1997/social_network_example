import { User } from '../../../user/domain/User'
import styles from './Navbar.module.css'

interface NavbarProps {
    user: User
}

export const Navbar = (props: NavbarProps) => {
    const { user } = props

    return <nav className={styles.navbar}>
        <div className={styles.navColumn}>
            <label className={styles.navSysma}>SYSMA</label>
        </div>
        <div className={styles.navColumn}>
            medium
        </div>
        <div className={`${styles.navColumn} ${styles.navEnd}`}>
            {user.name}
        </div>
    </nav>
}