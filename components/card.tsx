import style from '../styles/modules/card.module.scss'

interface ICard {
    children: React.ReactNode
    title: string
    className?: string
}

export default function Card({children, title, className}: ICard) {
    return (
        <section className={[className, style.card].join(' ')}>
            <header>
                <h2>{title}</h2>
            </header>   
            {children}
        </section>
    )
}