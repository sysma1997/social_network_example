import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import { User } from "../../src/user/domain/User"

import { Http } from "../../src/shared/infrastructure/Http"

import { Navbar } from "../../src/components/panel/navbar/Navbar"

export default function Panel() {
    const router = useRouter()

    const [user, setUser] = useState<User>(new User())

    useEffect(() => {
        Http.Init("GET", "user", null, response => {
            if (response.status !== 200) 
                router.push("/")

            setUser(new User(response.result))
        })
    }, [user.id != ""])

    return <>
        <Head>
            <title>SYSMA</title>
            <meta name="description" content="Panel to SYSMA social network" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Navbar user={user} />
        </main>
    </>
}