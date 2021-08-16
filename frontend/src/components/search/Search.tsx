import { ChangeEvent, CSSProperties, KeyboardEvent } from "react";
import { Input } from "../input/Input";
import styles from "./Search.module.css"

interface Props {
    className?: string,
    style?: CSSProperties,
    placeholder?: string,
    value?: any,

    onChange?: (event: ChangeEvent<HTMLInputElement>) => any
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => any

    list?: Array<any>,
    listItemOnClick?: (item: any) => any
}

export const Search = (props: Props) => {
    return <div className={`${styles.search} ${props.className}`}
        style={props.style}>
        <Input className={`${styles.searchInput} ${props.className}`}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown} />
        {(props.list) && (props.list.length > 0) && <ul className={styles.list}>
            {props.list.map((item, index) => <li key={index}
                className={styles.listItem}
                onClick={() => {
                    if (props.listItemOnClick) props.listItemOnClick(item)
                }}>
                {(item.image) && <img className={styles.listItemImage} src={item.image} alt={item.image} />}
                {item.text}
            </li>)}
        </ul>}
    </div>
}