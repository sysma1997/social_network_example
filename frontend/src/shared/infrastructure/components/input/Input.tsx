import { ChangeEvent, CSSProperties } from 'react'
import styles from './Input.module.css'

interface InputProps {
    className?: string, 
    style?: CSSProperties, 
    placeholder?: string, 
    type?: string, 
    value?: any, 
    checked?: boolean

    onChange?: (event: ChangeEvent<HTMLInputElement>) => any
}

export const Input = (props: InputProps) => <input 
    className={`${styles.input} ${props.className}`}
    style={props.style}
    type={props.type || "text"} 
    placeholder={props.placeholder} 
    value={props.value} 
    checked={props.checked}
    onChange={props.onChange} />