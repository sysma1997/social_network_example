import { Dispatch, SetStateAction } from "react"

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