import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Register.module.css'

import { Input } from '../src/shared/infrastructure/components/input/Input'
import { Button } from '../src/shared/infrastructure/components/button/Button'
import { EmailValue } from '../src/shared/domain/EmailValue'

export default function Register() {
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
            <div className={styles.form}>
                <label className={styles.formTitle}>Personal information</label>
                <Input type="text" placeholder="Full name" />
                <Input style={{textAlign: "center", fontSize: 18}} type="date" placeholder="Birthday" />
                <div className={styles.formGender}>
                    <div className={`${styles.formGenderType}`}>
                        <label>Male</label>
                        <Input type="checkbox" />
                    </div>
                    <div className={`${styles.formGenderType}`}>
                        <label>Female</label>
                        <Input type="checkbox" />
                    </div>
                </div>

                <br />

                <label className={styles.formTitle}>Information to create the user</label>
                <Input type="text" placeholder="Email" />
                <Input type="text" placeholder="Username" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Repeat password" />
                <Button>Register</Button>
            </div>
        </main>
    </>
}