import { useState, useEffect, Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../../styles/Form.module.css'
import styles from '../../styles/Register.module.css'

import { Input } from '../../src/components/input/Input'
import { Button } from '../../src/components/button/Button'
import { EmailValue } from '../../src/shared/domain/EmailValue'
import { Http } from '../../src/shared/infrastructure/Http'
import { setErrorStyle, setError, clearError } from '../../src/shared/infrastructure/ValidationInput'

export default function ForgotPassword() {
    const router = useRouter()

    useEffect(() => {
        Http.Init("GET", "user", null, response => {
            if (response.status === 200)
                router.push("panel")
        })
    }, [])

    const [email, setEmail] = useState<string>("")
    const [emailBorder, setEmailBorder] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    const [sendEmail, setSendEmail] = useState<boolean>(false)

    const keyDownForgotPassword = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") await forgotPassword()
    }
    const forgotPassword = async () => {
        if (email === "") {
            setError(setEmailBorder, setEmailError, "Email not empty.")

            return
        }
        else clearError(setEmailBorder, setEmailError)

        if (!EmailValue.Validate(email)) {
            setError(setEmailBorder, setEmailError, "Email not valid.")

            return
        }
        else clearError(setEmailBorder, setEmailError)

        const response = await Http.Init("GET", `user/passwordrecovery/${email}`, null)
        if (response.status !== 200) {
            setMessageError(response.result)

            return
        }
        setMessageError("")
        setSendEmail(true)
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
                margin: "2rem 0"
            }}>
                SYSMA
            </label>
            <div className={`${stylesForm.content} ${styles.form}`}
                style={{ display: ((!sendEmail) ? "flex" : "none") }}>
                <Input type="email" style={{ border: emailBorder }} placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onKeyDown={keyDownForgotPassword} />
                <small style={setErrorStyle}>{emailError}</small>
                <label style={{...setErrorStyle,  textAlign: "center" }}>
                    <b>{messageError}</b>
                </label>
                <Button onClick={forgotPassword}>Login</Button>

                <hr className={stylesForm.hr} />

                <Link href="/">
                    <a className={stylesForm.text}>Go back</a>
                </Link>
            </div>
            <div className={`${stylesForm.content} ${styles.form}`}
                style={{ display: ((sendEmail) ? "flex" : "none") }}>
                <label className={stylesForm.title}>Request sent to the mail</label>

                <label className={`${stylesForm.text} ${styles.formText}`}>
                    An email has been sent to you to recover your account.
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