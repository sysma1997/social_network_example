import { KeyboardEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head";
import Link from "next/link"
import stylesForm from "../styles/Form.module.css"
import styles from "../styles/Login.module.css"

import { Input } from '../src/components/input/Input'
import { Button } from '../src/components/button/Button'
import { setErrorStyle, setError, clearError } from '../src/shared/infrastructure/ValidationInput'
import { UserGetApiRepository } from '../src/user/infrastructure/get/UserGetApiRepository';
import { GetUser } from '../src/user/application/get/GetUser';
import { UserLoginApiRepository } from '../src/user/infrastructure/login/UserLoginApiRepository';
import { LoginUser } from '../src/user/application/login/LoginUser';

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const repository = new UserGetApiRepository()
            const getUser = new GetUser(repository)

            const user = await getUser.init()
            if (user != null) router.push("panel/home")
        })()
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

        const repository = new UserLoginApiRepository()
        const login = new LoginUser(repository)

        if (!await login.init(username, password)) {
            setMessageError("Username or password invalid")
            return
        }

        router.push("panel/home")
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
                <small style={setErrorStyle}>{usernameError}</small>
                <Input type="password" style={{ border: passwordBorder }} placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    onKeyDown={keyDownLogin} />
                <small style={setErrorStyle}>{passwordError}</small>
                <label style={{ ...setErrorStyle, textAlign: "center" }}>
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