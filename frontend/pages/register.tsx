import { useState, useEffect, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../styles/Form.module.css'
import styles from '../styles/Register.module.css'

import { Input } from '../src/components/input/Input'
import { Button } from '../src/components/button/Button'
import { EmailValue } from '../src/shared/domain/EmailValue'
import { UuidValue } from '../src/shared/domain/UuidValue'
import { Http } from '../src/shared/infrastructure/Http'
import { setError, clearError } from '../src/shared/infrastructure/ValidationInput'

export default function Register() {
    const router = useRouter()

    useEffect(() => {
        Http.Init("GET", "user", null, response => {
            if (response.status === 200)
                router.push("panel")
        })
    }, [])

    const [name, setName] = useState<string>("")
    const [nameBorder, setNameBorder] = useState<string>("")
    const [nameError, setNameError] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("")
    const [birthdayBorder, setBirthdayBorder] = useState<string>("")
    const [birthdayError, setBirthdayError] = useState<string>("")
    const [gender, setGender] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [emailBorder, setEmailBorder] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [usernameBorder, setUsernameBorder] = useState<string>("")
    const [usernameError, setUsernameError] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordBorder, setPasswordBorder] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [repeatPasswordBorder, setRepeatPasswordBorder] = useState<string>("")
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)

    const keyDownRegister = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') await register()
    }
    const register = async () => {
        const clearAll = () => {
            clearError(setNameBorder, setNameError)
            clearError(setBirthdayBorder, setBirthdayError)
            clearError(setEmailBorder, setEmailError)
            clearError(setUsernameBorder, setUsernameError)
            clearError(setPasswordBorder, setPasswordError)
            clearError(setRepeatPasswordBorder, setRepeatPasswordError)
        }

        if (name === "" ||
            birthday === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            repeatPassword === "") {
            if (name === "") setError(setNameBorder, setNameError, "Name not empty.")
            else clearError(setNameBorder, setNameError)
            if (birthday === "") setError(setBirthdayBorder, setBirthdayError, "Birthday not empty.")
            else clearError(setBirthdayBorder, setBirthdayError)
            if (email === "") setError(setEmailBorder, setEmailError, "Email not empty.")
            else clearError(setEmailBorder, setEmailError)
            if (username === "") setError(setUsernameBorder, setUsernameError, "Username not empty.")
            else clearError(setUsernameBorder, setUsernameError)
            if (password === "") setError(setPasswordBorder, setPasswordError, "Password not empty.")
            else clearError(setPasswordBorder, setPasswordError)
            if (repeatPassword === "")
                setError(setRepeatPasswordBorder, setRepeatPasswordError, "Repeat password not empty.")
            else clearError(setRepeatPasswordBorder, setRepeatPasswordError)
            return
        }
        clearAll()
        if (!EmailValue.Validate(email)) {
            setError(setEmailBorder, setEmailError, "Email not valid.")
            return
        }
        clearAll()
        if (password !== repeatPassword) {
            setError(setPasswordBorder, setPasswordError, "")
            setError(setRepeatPasswordBorder, setRepeatPasswordError,
                "Password and repeat password don't match.")
            return
        }
        clearAll()

        const user = {
            id: UuidValue.Generate().value.toString(),
            name,
            birthday,
            gender,
            email,
            username,
            password
        }

        Http.Init("POST", "user", JSON.stringify(user), response => {
            if (response.status !== 201) {
                setMessageError(response.result)

                return
            }
            setMessageError("")
            setRegisterSuccess(true)
        })
    }

    return <>
        <Head>
            <title>Register</title>
            <meta name="description" content="Register to SYSMA social network" />
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
                style={{ display: ((!registerSuccess) ? "flex" : "none") }}>
                <label className={stylesForm.title}>Personal information</label>
                <Input type="text" style={{ border: nameBorder }} placeholder="Full name"
                    value={name} onChange={event => setName(event.target.value)} />
                <small className={stylesForm.small}>{nameError}</small>
                <Input type="date" style={{ textAlign: "center", fontSize: 18, border: birthdayBorder }}
                    placeholder="Birthday" value={birthday}
                    onChange={event => setBirthday(event.target.value)} />
                <small className={stylesForm.small}>{birthdayError}</small>
                <div className={styles.formGender}>
                    <div className={`${styles.formGenderType}`}>
                        <label onClick={() => setGender(false)}>Male</label>
                        <Input type="checkbox"
                            checked={!gender} onChange={event => setGender(event.target.checked)} />
                    </div>
                    <div className={`${styles.formGenderType}`}>
                        <label onClick={() => setGender(true)}>Female</label>
                        <Input type="checkbox"
                            checked={gender} onChange={event => setGender(event.target.checked)} />
                    </div>
                </div>

                <hr className={stylesForm.hr} />

                <label className={stylesForm.title}>Information to create the user</label>
                <Input type="email" style={{ border: emailBorder }} placeholder="Email"
                    value={email} onChange={event => setEmail(event.target.value)} />
                <small className={stylesForm.small}>{emailError}</small>
                <Input type="text" style={{ border: usernameBorder }} placeholder="Username"
                    value={username} onChange={event => setUsername(event.target.value)} />
                <small className={stylesForm.small}>{usernameError}</small>
                <Input type="password" style={{ border: passwordBorder }} placeholder="Password"
                    value={password} onChange={event => setPassword(event.target.value)} />
                <small className={stylesForm.small}>{passwordError}</small>
                <Input type="password" style={{ border: repeatPasswordBorder }} placeholder="Repeat password"
                    value={repeatPassword} onChange={event => setRepeatPassword(event.target.value)}
                    onKeyDown={keyDownRegister} />
                <small className={stylesForm.small}>{repeatPasswordError}</small>
                <label className={stylesForm.small} style={{ textAlign: "center" }}>
                    <b>{messageError}</b>
                </label>
                <Button onClick={register}>Register</Button>

                <Link href="/login">
                    <a className={stylesForm.text}>Already have and account?</a>
                </Link>

                <hr className={stylesForm.hr} />

                <Link href="/">
                    <a className={stylesForm.text}>Go back</a>
                </Link>
            </div>
            <div className={`${stylesForm.content} ${styles.form}`}
                style={{ display: ((registerSuccess) ? "flex" : "none") }}>
                <label className={stylesForm.title}>Thanks for register in SYSMA!</label>

                <label className={`${stylesForm.text} ${styles.formText}`}>
                    An email has been sent to you to enable your account.
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