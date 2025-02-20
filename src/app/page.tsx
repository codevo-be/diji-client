import Link from 'next/link'

export default function Index() {
    return (
        <section>
            <h1>Home</h1>
            <Link href={'/login'}>Login</Link>
        </section>
    )
}
