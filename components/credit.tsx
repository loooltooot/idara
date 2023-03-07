import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/modules/credit.module.scss'

export default function Credits() {
    return (
        <Link href='https://loooltooot.github.io'>
            <Image
                src='/img/credit.png'
                width={117}
                height={54}
                alt='Wrote by Emir Zakrewski'
                className={styles.credit}
                loading='lazy'
            />
        </Link>
    )
}