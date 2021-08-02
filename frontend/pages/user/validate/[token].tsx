import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import stylesForm from '../../../styles/Form.module.css'
import styles from '../../../styles/Register.module.css'

import { Http } from '../../../src/shared/infrastructure/Http'

export default function Get() {
    const router = useRouter()
    const { token } = router.query

    const [message, setMessage] = useState("")

    if (token != undefined) {
        Http.Init("GET", `user/validate/${token}`, null, response => {
            if (response.status !== 200) {
                setMessage(response.result)

                return
            }

            setMessage("Now your account is already valid to use the application.")
        })
    }

    return <>
        <Head>
            <title>Validate user</title>
            <meta name="description" content="Validate user to SYSMA social network" />
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
            <div className={`${stylesForm.content} ${styles.form}`}>
                <label className={stylesForm.title}>Thanks for register in SYSMA!</label>

                <label className={`${stylesForm.text} ${styles.formText}`}>
                    {message}
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