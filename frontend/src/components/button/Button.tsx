import { CSSProperties } from 'react'
import styles from './Button.module.css'

interface Props {
    className?: string
    style?: CSSProperties
    onClick?: () => any, 
    
    children?: any
}

export const Button = (props: Props) => <button 
    className={`${styles.button} ${props.className}`} 
    style={props.style}
    onClick={props.onClick}>
        {props.children}
    </button>