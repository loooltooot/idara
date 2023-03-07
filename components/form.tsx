import { IField } from "@/models/field";
import { useState } from "react";
import Card from "./card";
import InputField from "./inputField";
import style from '../styles/modules/form.module.scss'

export default function Form() {
    const [fields, setFields] = useState<Array<IField>>([
        {name: '', planValue: 0, factValue: 0},
        {name: '', planValue: 0, factValue: 0},
        {name: '', planValue: 0, factValue: 0},
    ])

    return (
        <Card title="Исходные данные" className={style.data}>
            <table>
                <tbody>
                    <tr>
                        <td>Показатель</td><td>План</td><td>Факт</td>
                    </tr>
                    {fields.map((field, index) => (
                        <tr key={index}>
                            <td>
                                <InputField 
                                    name={`name${index}`} 
                                    value={field.name} 
                                    onchange={() => {}}
                                />
                            </td>
                            <td>
                                <InputField 
                                    name={`planValue${index}`} 
                                    value={field.planValue} 
                                    onchange={() => {}}
                                />
                            </td>
                            <td>
                                <InputField 
                                    name={`factValue${index}`} 
                                    value={field.factValue} 
                                    onchange={() => {}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={style.controls}>
                <button onClick={() => addField(setFields, fields)}>+</button>
                <button onClick={() => removeField(setFields, fields)}>-</button>
            </div>
        </Card>
    )
}

function addField(setFields: Function, fields: IField[]) {
    setFields([...fields, {name: '', planValue: 0, factValue: 0}])
}

function removeField(setFields: Function, fields: IField[]) {
    const temp = fields
    temp.pop()

    setFields([...temp])
}