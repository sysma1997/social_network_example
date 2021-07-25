import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return <>
    <Head>
        <title>SYSMA Social network</title>
        <meta name="description" content="Example to social network" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <style jsx global>{`
      body {
        background: rgb(255, 218, 0);
        background: linear-gradient(140deg, rgba(255, 218, 0, 1) 60%, rgba(255, 184, 0, 1) 60.1%);
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
          <ul>Features:
            <li>Create and manage account with tokens.</li>
            <li>Add and search for users.</li>
            <li>Create, modify and delete (CRUD) of posts.</li>
          </ul>
        </div>
      </div>
      <div className={styles.form}>
        <input className={styles.formInput} type="email" placeholder="Email" />
        <input className={styles.formInput} type="password" placeholder="Password" />
        <input className={`${styles.formInput} ${styles.formButtonLogin}`} 
          type="button" value="Login" />
        <Link href="#">
          <a className={styles.formForgetPassword}>Did you forget your password?</a>
        </Link>
        <hr className={styles.formHr} />
        <input className={`${styles.formInput} ${styles.formButtonRegister}`} 
          type="button" value="Register" />
      </div>
    </main>
  </>
}
