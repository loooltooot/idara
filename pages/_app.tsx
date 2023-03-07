import '@/styles/normalize.css'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { EB_Garamond } from 'next/font/google'

const garamond = EB_Garamond({subsets: ['cyrillic', 'latin']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${garamond.style.fontFamily}
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
