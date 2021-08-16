import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import { User } from "../../src/user/domain/User"

import { Http } from "../../src/shared/infrastructure/Http"

import { Navbar } from "../../src/components/panel/navbar/Navbar"
import { PanelContent } from "../../src/components/panel/PanelContent"
import { Friends } from "../../src/components/panel/friends/Friends"
import { UuidValue } from "../../src/shared/domain/UuidValue"
import { EmailValue } from "../../src/shared/domain/EmailValue"

export default function Panel() {
    const router = useRouter()

    const [user, setUser] = useState<User>(new User(
        UuidValue.Generate(),
        "",
        new Date(),
        false,
        new EmailValue("noEmail@email.com"),
        "",
        "",
        false,
        null
    ))

    useEffect(() => {
        Http.Init("GET", "user", null, response => {
            if (response.status !== 200)
                router.push("/")

            setUser(new User(response.result))
        })
    }, [user.id.value != ""])

    return <>
        <Head>
            <title>SYSMA</title>
            <meta name="description" content="Panel to SYSMA social network" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Navbar user={user} />
            <PanelContent user={user} />
            <Friends />
        </main>
    </>
}