import { Dispatch, KeyboardEvent, SetStateAction, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../styles/Form.module.css'
import styles from '../styles/Home.module.css'

import { Button } from '../src/shared/infrastructure/components/button/Button'
import { Input } from '../src/shared/infrastructure/components/input/Input'
import { Http } from '../src/shared/infrastructure/Http'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token !== null) {
      router.push("/panel")
    }
  }, [])

  const [username, setUsername] = useState<string>("")
  const [usernameBorder, setUsernameBorder] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordBorder, setPasswordBorder] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [messageError, setMessageError] = useState<string>("")

  const keyDownLogin = async (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") login()
  }
  const login = async () => {
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
    
    const login = {
      username, 
      password
    }
    const response = await Http.Init("POST", "user/login", JSON.stringify(login))
    if(response.status !== 200) {
      setMessageError(response.result)

      return
    }
    setMessageError("")

    localStorage.setItem("token", response.result)
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
          value={password} 
          onChange={event => setPassword(event.target.value)} 
          onKeyDown={keyDownLogin} />
        <small className={stylesForm.small}>{passwordError}</small>
        <label className={stylesForm.small} style={{ textAlign: "center" }}>
          <b>{messageError}</b>
        </label>
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
