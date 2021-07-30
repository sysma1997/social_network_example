import { Dispatch, SetStateAction, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../styles/Form.module.css'
import styles from '../styles/Home.module.css'

import { Button } from '../src/shared/infrastructure/components/button/Button'
import { Input } from '../src/shared/infrastructure/components/input/Input'

export default function Home() {
  const [username, setUsername] = useState<string>("")
  const [usernameBorder, setUsernameBorder] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordBorder, setPasswordBorder] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const login = () => {
    const clearError = (inputBorder: Dispatch<SetStateAction<string>>, 
      small: Dispatch<SetStateAction<string>>) => {
      inputBorder("")
      small("")
    }
    const setError = (inputBorder: Dispatch<SetStateAction<string>>, 
      small: Dispatch<SetStateAction<string>>, 
      message: string) => {
      inputBorder("2px solid red")
      small(message)
    }

    const clearAll = () => {
      clearError(setUsernameBorder, setUsernameError)
      clearError(setPasswordBorder, setPasswordError)
    }

    if (username === "" || password === "") {
      if(username === "") setError(setUsernameBorder, setUsernameError, "Username not empty.")
      else clearError(setUsernameBorder, setUsernameError)
      if(password === "") setError(setPasswordBorder, setPasswordError, "Password not empty.")
      else clearError(setPasswordBorder, setPasswordError)
      return
    }
    clearAll()
    /*  */
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
        <br/>
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
        <Input type="text" style={{border: usernameBorder}} placeholder="Username" 
          value={username} onChange={event => setUsername(event.target.value)} />
        <small className={stylesForm.small}>{usernameError}</small>
        <Input type="password" style={{border: passwordBorder}} placeholder="Password" 
          value={password} onChange={event => setPassword(event.target.value)} />
        <small className={stylesForm.small}>{passwordError}</small>
        <Button onClick={login}>Login</Button>
        <Link href="#">
          <a className={stylesForm.text}>Forgot password?</a>
        </Link>
        <hr className={stylesForm.hr} />
        <Link href="/register"><a className={stylesForm.text}>Register</a></Link>
      </div>
    </main>
  </>
}
