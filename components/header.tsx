import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>iDara</h1>
            <Link href='https://loooltooot.github.io'>
                <Image 
                    src="/img/logo.png" 
                    alt="Emir Zakrewski"
                    width={54}
                    height={54} 
                />
            </Link>
        </header>
    )
}