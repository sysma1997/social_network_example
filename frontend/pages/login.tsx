import Head from "next/head";
import Link from "next/link"
import stylesForm from "../styles/Form.module.css"
import styles from "../styles/Login.module.css"

import { Input } from '../src/shared/infrastructure/components/input/Input'
import { Button } from '../src/shared/infrastructure/components/button/Button'
import { EmailValue } from '../src/shared/domain/EmailValue'

export default function Login() {
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
                <Input type="text" placeholder="Username" />
                <Input type="password" placeholder="Password" />
                <Button>Login</Button>
                
                <div className={styles.formLinks}>
                    <Link href="#">
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