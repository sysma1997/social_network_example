import { Dispatch, KeyboardEvent, SetStateAction, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head";
import Link from "next/link"
import stylesForm from "../styles/Form.module.css"
import styles from "../styles/Login.module.css"

import { Input } from '../src/components/input/Input'
import { Button } from '../src/components/button/Button'
import { Http } from '../src/shared/infrastructure/Http'
import { setError, clearError } from '../src/shared/infrastructure/ValidationInput'

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        Http.Init("GET", "user", null, response => {
            if (response.status === 200)
                router.push("panel")
        })
    }, [])

    const [username, setUsername] = useState<string>("")
    const [usernameBorder, setUsernameBorder] = useState<string>("")
    const [usernameError, setUsernameError] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordBorder, setPasswordBorder] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")

    const keyDownLogin = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") await login()
    }
    const login = async () => {
        const clearAll = () => {
            clearError(setUsernameBorder, setUsernameError)
            clearError(setPasswordBorder, setPasswordError)
        }

        if (username === "" || password === "") {
            if (username === "") setError(setUsernameBorder, setUsernameError, "Username not empty.")
            else clearError(setUsernameBorder, setUsernameError)
            if (password === "") setError(setPasswordBorder, setPasswordError, "Password not empty.")
            else clearError(setPasswordBorder, setPasswordError)
            return
        }
        clearAll()

        const login = {
            username,
            password
        }
        const response = await Http.Init("POST", "user/login", JSON.stringify(login))
        if (response.status !== 200) {
            setMessageError(response.result)

            return
        }
        setMessageError("")

        localStorage.setItem("token", response.result)
        router.push("/panel")
    }

    return <>
        <Head>
            <title>Login</title>
            <meta name="description" content="Login to SYSMA social network" />
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
                margin: "2rem 0"
            }}>
                SYSMA
            </label>
            <div className={`${stylesForm.content} ${styles.form}`}>
                <Input type="text" style={{ border: usernameBorder }} placeholder="Username"
                    value={username} onChange={event => setUsername(event.target.value)} />
                <small className={stylesForm.small}>{usernameError}</small>
                <Input type="password" style={{ border: passwordBorder }} placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    onKeyDown={keyDownLogin} />
                <small className={stylesForm.small}>{passwordError}</small>
                <label className={stylesForm.small} style={{ textAlign: "center" }}>
                    <b>{messageError}</b>
                </label>
                <Button onClick={login}>Login</Button>

                <div className={styles.formLinks}>
                    <Link href="/user/forgotPassword">
                        <a className={`${stylesForm.text} ${styles.formLink}`}>Forgot password?</a>
                    </Link>
                    <Link href="/register">
                        <a className={`${stylesForm.text} ${styles.formLink}`}>Sign up for SYSMA</a>
                    </Link>
                </div>

                <hr className={stylesForm.hr} />

                <Link href="/">
                    <a className={stylesForm.text}>Go back</a>
                </Link>
            </div>
        </main>
    </>
}