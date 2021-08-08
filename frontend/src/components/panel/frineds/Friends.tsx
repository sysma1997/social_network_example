import styles from "./Friends.module.css"

export const Friends = () => {
    const level = []
    for (let i = 0; i < 10; i++)
        level.push(`name_${Math.floor(Math.random() * i + 1)}`)

    return <div className={styles.friends}>
        lorem
        <ul>
            {level.map(item => <li>{item}</li>)}
        </ul>
    </div>
}