import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import stylesForm from '../styles/Form.module.css'
import styles from '../styles/Register.module.css'

import { Input } from '../src/components/input/Input'
import { Button } from '../src/components/button/Button'
import { EmailValue } from '../src/shared/domain/EmailValue'
import { UuidValue } from '../src/shared/domain/UuidValue'
import { setErrorStyle, setError, clearError } from '../src/shared/infrastructure/ValidationInput'
import { UserGetApiRepository } from '../src/user/infrastructure/get/UserGetApiRepository'
import { GetUser } from '../src/user/application/get/GetUser'
import { User } from '../src/user/domain/User'
import { UserRegisterApiRepository } from '../src/user/infrastructure/register/UserRegisterApiRepository'
import { RegisterUser } from '../src/user/application/register/RegisterUser'

export default function Register() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const repository = new UserGetApiRepository()
            const getUser = new GetUser(repository)

            const user = await getUser.init()
            if (user != null) router.push("panel/home")
        })()
    }, [])

    const [name, setName] = useState<string>("")
    const [nameBorder, setNameBorder] = useState<string>("")
    const [nameError, setNameError] = useState<string>("")
    const [birthday, setBirthday] = useState<Date>(new Date())
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
            clearError(setEmailBorder, setEmailError)
            clearError(setUsernameBorder, setUsernameError)
            clearError(setPasswordBorder, setPasswordError)
            clearError(setRepeatPasswordBorder, setRepeatPasswordError)
        }

        if (name === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            repeatPassword === "") {
            if (name === "") setError(setNameBorder, setNameError, "Name not empty.")
            else clearError(setNameBorder, setNameError)
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

        const user = new User(
            UuidValue.Generate(),
            name,
            birthday,
            gender,
            new EmailValue(email),
            username,
            password,
            false,
            null
        )

        const repository = new UserRegisterApiRepository()
        const register = new RegisterUser(repository)

        setMessageError("")
        try {
            setRegisterSuccess(await register.init(user))
        } catch (error: any) {
            setMessageError(error.toString())
        }
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
                <small style={setErrorStyle}>{nameError}</small>
                <Input type="date" style={{ textAlign: "center", fontSize: 18 }}
                    placeholder="Birthday" value={dayjs(birthday).format("YYYY-MM-DD")}
                    onChange={event => 
                        setBirthday(dayjs(event.target.value, "YYYY-MM-DD").toDate())} />
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
                <small style={setErrorStyle}>{emailError}</small>
                <Input type="text" style={{ border: usernameBorder }} placeholder="Username"
                    value={username} onChange={event => setUsername(event.target.value)} />
                <small style={setErrorStyle}>{usernameError}</small>
                <Input type="password" style={{ border: passwordBorder }} placeholder="Password"
                    value={password} onChange={event => setPassword(event.target.value)} />
                <small style={setErrorStyle}>{passwordError}</small>
                <Input type="password" style={{ border: repeatPasswordBorder }} placeholder="Repeat password"
                    value={repeatPassword} onChange={event => setRepeatPassword(event.target.value)}
                    onKeyDown={keyDownRegister} />
                <small style={setErrorStyle}>{repeatPasswordError}</small>
                <label style={{ ...setErrorStyle, textAlign: "center" }}>
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