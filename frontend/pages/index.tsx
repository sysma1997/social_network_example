import { KeyboardEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../styles/Form.module.css'
import styles from '../styles/Home.module.css'

import { Button } from '../src/components/button/Button'
import { Input } from '../src/components/input/Input'
import { setErrorStyle, setError, clearError } from '../src/shared/infrastructure/ValidationInput'
import { UserGetApiRepository } from '../src/user/infrastructure/get/UserGetApiRepository'
import { GetUser } from '../src/user/application/get/GetUser'
import { UserLoginApiRepository } from '../src/user/infrastructure/login/UserLoginApiRepository'
import { LoginUser } from '../src/user/application/login/LoginUser'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const repository = new UserGetApiRepository()
      const getUser = new GetUser(repository)

      const user = await getUser.init()
      if (user != null) router.push("panel")
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

    router.push("/panel")
  }

  return <>
    <Head>
      <title>SYSMA Social network</title>
      <meta name="description" content="Example to social network" />
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
      <div className={styles.presentation}>
        <div className={styles.presentationTitle}>Welcome to SYSMA!</div>
        <br />
        <div className={styles.presentationDescription}>
          This is a simple example of how to create a social network.
          <ul><b>Features</b>:
            <li>Create and manage account with tokens.</li>
            <li>Add and search for users.</li>
            <li>Create, modify and delete (CRUD) of posts.</li>
          </ul>
        </div>
      </div>
      <div className={stylesForm.content}>
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
        <Link href="/user/forgotPassword">
          <a className={stylesForm.text}>Forgot password?</a>
        </Link>
        <hr className={stylesForm.hr} />
        <Link href="/register"><a className={stylesForm.text}>Register</a></Link>
      </div>
    </main>
  </>
}
