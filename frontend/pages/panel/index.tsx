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
            <div style={{padding: 100}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div style={{padding: 100}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div style={{padding: 100}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div style={{padding: 100}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </main>
    </>
}