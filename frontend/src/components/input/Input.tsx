import { ChangeEvent, CSSProperties, KeyboardEvent } from 'react'
import styles from './Input.module.css'

interface InputProps {
    className?: string,
    style?: CSSProperties,
    placeholder?: string,
    type?: string,
    value?: any,
    checked?: boolean,

    onChange?: (event: ChangeEvent<HTMLInputElement>) => any
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => any
}

export const Input = (props: InputProps) => <input
    className={`${styles.input} ${props.className}`}
    style={props.style}
    type={props.type || "text"}
    placeholder={props.placeholder}
    value={props.value}
    checked={props.checked}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown} />