import { useRouter } from 'next/router'

const Get = () => {
    const router = useRouter()
    const { token } = router.query

    return <p>recover password user token: {token}</p>
}

export default Get