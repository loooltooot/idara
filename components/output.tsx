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
    const [isStart, setIsStart] = useState(false)

    function printOutput(output: string) {

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
                <button onClick={() => setIsStart(true)}>Рассчитать</button>
            </div>
            <p className={style.content} id="output-content">
                {isStart 
                    ? output
                    : ''
                }
            </p>
        </Card>
    )
}