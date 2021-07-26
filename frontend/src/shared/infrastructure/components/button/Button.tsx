import { CSSProperties } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    className?: string
    style?: CSSProperties
    onClick?: () => any, 
    
    children?: any
}

export const Button = (props: ButtonProps) => <button 
    className={`${styles.button} ${props.className}`} 
    style={props.style}
    onClick={props.onClick}>
        {props.children}
    </button>