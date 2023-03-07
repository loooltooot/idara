import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'

interface ILayout {
    children: React.ReactNode
    title?: string
}

export default function Layout({children, title}: ILayout) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}