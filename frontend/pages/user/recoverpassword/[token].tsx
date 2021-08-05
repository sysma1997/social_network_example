import { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../../../styles/Form.module.css'
import styles from '../../../styles/Register.module.css'

import { Button } from '../../../src/components/button/Button'
import { Input } from '../../../src/components/input/Input'
import { Http } from '../../../src/shared/infrastructure/Http'
import { setError, clearError } from '../../../src/shared/infrastructure/ValidationInput'

export default function Get() {
    const router = useRouter()
    const { token } = router.query

    const [password, setPassword] = useState<string>("")
    const [passwordBorder, setPasswordBorder] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [repeatPasswordBorder, setRepeatPasswordBorder] = useState<string>("")
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    const [updatePassword, setUpdatePassword] = useState<boolean>(false)

    const keyDownForgotPassword = async (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") await forgotPassword()
    }
    const forgotPassword = async () => {
        const clearAll = () => {
            clearError(setPasswordBorder, setPasswordError)
            clearError(setRepeatPasswordBorder, setRepeatPasswordError)
        }

        if (password === "" || 
            repeatPassword === "") {
            if(password === "") setError(setPasswordBorder, setPasswordError, "Password not empty.")
            else clearError(setPasswordBorder, setPasswordError)
            if(repeatPassword === "") setError(setRepeatPasswordBorder, setRepeatPasswordError, 
                "Repeat password not empty.")
            else clearError(setRepeatPasswordBorder, setRepeatPasswordError)
            return
        }
        clearAll()
        if(password !== repeatPassword) {
            setError(setPasswordBorder, setPasswordError, "")
            setError(setRepeatPasswordBorder, setRepeatPasswordError, 
                "Password and repeat password don't match.")
            return
        }
        clearAll()

        const put = {
            token, 
            password
        }

        const response = await Http.Init("PUT", "user/passwordrecovery", JSON.stringify(put))
        if(response.status !== 200) {
            setMessageError(response.result)

            return
        }
        setMessageError("")

        setUpdatePassword(true)
    }

    return <>
        <Head>
            <title>Forgot password</title>
            <meta name="description" content="Forgot password to SYSMA social network" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <style jsx global>{`
            body {
                background: linear-gradient(140deg, var(--color-primary) 60%, var(--color-secondary) 60.1%);
                background-attachment: fixed;
                width: 100%;
                height: 100vh;
            }
        `}</style>

        <main className={styles.container}>
            {/* IMAGE DE SYSMA */}
            <label style={{
                color: "var(--color-secondary)",
                fontSize: "4em",
                fontWeight: "bold",
                margin: "1rem 0"
            }}>
                SYSMA
            </label>
            <div className={`${stylesForm.content} ${styles.form}`}
                style={{ display: ((!updatePassword) ? "flex" : "none") }}>
                <label className={stylesForm.title}>Forgot password</label>

                <Input type="password" style={{ border: passwordBorder }} placeholder="Password"
                    value={password} onChange={event => setPassword(event.target.value)} />
                <small className={stylesForm.small}>{passwordError}</small>
                <Input type="password" style={{ border: repeatPasswordBorder }} placeholder="Repeat password"
                    value={repeatPassword} 
                    onChange={event => setRepeatPassword(event.target.value)} 
                    onKeyDown={keyDownForgotPassword} />
                <small className={stylesForm.small}>{repeatPasswordError}</small>
                <label className={stylesForm.small} style={{ textAlign: "center" }}>
                    <b>{messageError}</b>
                </label>
                <Button onClick={forgotPassword}>Update password</Button>

                <hr className={stylesForm.hr} />

                <Link href="/">
                    <a className={stylesForm.text}>Go back</a>
                </Link>
            </div>
            <div className={`${stylesForm.content} ${styles.form}`}
                style={{ display: ((updatePassword) ? "flex" : "none") }}>
                <label className={stylesForm.title}>Update password correctly.</label>

                <label className={`${stylesForm.text} ${styles.formText}`}>
                    Your password has been updated successfully, you can now log in.
                </label>

                <Link href="/login">
                    <a className={stylesForm.text}>Login</a>
                </Link>

                <hr className={stylesForm.hr} />

                <Link href="/">
                    <a className={stylesForm.text}>Go back</a>
                </Link>
            </div>
        </main>
    </>
}