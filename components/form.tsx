import { IField } from "@/models/field";
import { useState } from "react";
import Card from "./card";
import InputField from "./inputField";
import style from '../styles/modules/form.module.scss'

interface IForm {
    fields: IField[]
    setFields: Function
}

export default function Form({fields, setFields}: IForm) {
    function changeField(index: number, whatChange: number, value: string) {
        const temp: IField[] = JSON.parse(JSON.stringify(fields))
        
        switch(whatChange) {
            case 1:
                temp[index].name = value
                break
            case 2:
                temp[index].planValue = +value
                break
            case 3:
                temp[index].factValue = +value
                break
            default:
                console.log("ERROR")
                break
        }

        setFields([...temp])
    }

    function addField() {
        setFields([...fields, {name: '', planValue: 0, factValue: 0}])
    }
    
    function removeField() {
        const temp: IField[] = JSON.parse(JSON.stringify(fields))
        temp.pop()
    
        setFields([...temp])
    }

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
                                    onchange={changeField}
                                    index={index}
                                    whatChange={1}
                                />
                            </td>
                            <td>
                                <InputField 
                                    name={`planValue${index}`} 
                                    value={field.planValue} 
                                    onchange={changeField}
                                    index={index}
                                    whatChange={2}
                                />
                            </td>
                            <td>
                                <InputField 
                                    name={`factValue${index}`} 
                                    value={field.factValue} 
                                    onchange={changeField}
                                    index={index}
                                    whatChange={3}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={style.controls}>
                <button onClick={() => addField()}>+</button>
                <button onClick={() => removeField()}>-</button>
            </div>
        </Card>
    )
}

