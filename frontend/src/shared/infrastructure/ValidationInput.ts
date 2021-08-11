import { CSSProperties, Dispatch, SetStateAction } from "react"

export const setErrorStyle: CSSProperties = {
    color: "red", 
    marginLeft: "0.1rem", 
    marginTop: "0.2rem", 
    marginBottom: "0.6rem"
}

export const clearError = (inputBorder: Dispatch<SetStateAction<string>>,
    small: Dispatch<SetStateAction<string>>) => {
    inputBorder("")
    small("")
}
export const setError = (inputBorder: Dispatch<SetStateAction<string>>,
    small: Dispatch<SetStateAction<string>>,
    message: string) => {
    inputBorder("2px solid red")
    small(message)
}