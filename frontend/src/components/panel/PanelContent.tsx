import { useState } from "react"
import styles from "./Panel.module.css"

import { Posts } from "./content/posts/Post"

interface PanelContentInterface {
    content?: string
}

export const PanelContent = (props: PanelContentInterface) => {
    const [content, setContent] = useState(<Posts />)

    return <div className={styles.panel}>
        {content}
    </div>
}