import { IField } from "@/models/field";
import { useMemo, useState } from "react";
import Card from "./card";
import style from '../styles/modules/output.module.scss'
import { calcOutput } from "@/models/calc";

interface IOutput {
    fields: IField[]
}

export default function Output({fields}: IOutput) {
    const [target, setTarget] = useState('')
    const [isStarted, setIsStarted] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false)

    function printOutput(output: string) {
        const content = document.getElementById('output-content')

        if(content && !isStarted) {
            for(let i = 0; i < output.length; i++) {
                setTimeout(() => {
                    content.innerHTML += output[i]
                }, 10 * i)
            }
            setTimeout(() => {
                content.innerHTML = ''
                setIsAnimated(true)
            }, 10 * output.length)
        }
    }

    const output = useMemo(() =>
        calcOutput(fields, target), 
    [fields, target])

    return (
        <Card title="Вывод" className={style.output}>
            <div className={style.start_div}>
                <input 
                    type="text" 
                    placeholder="Что считаем?" 
                    onChange={(e) => setTarget(e.target.value)}
                    value={target}
                    className={style.input}
                />
                <button onClick={() => {
                    printOutput(calcOutput(fields, target))
                    setIsStarted(true)
                }}>Рассчитать</button>
            </div>
            <p className={style.content} id="output-content">
                {isAnimated 
                    ? output
                    : ''
                }
            </p>
        </Card>
    )
}