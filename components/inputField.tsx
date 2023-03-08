import { useState } from 'react'
import style from '../styles/modules/inputField.module.scss'

interface IInputField {
    name: string
    onchange: Function
    value: number | string
    index: number
    whatChange: number
}

export default function InputField({name, onchange, value, index, whatChange}: IInputField) {
    const [fieldValue, setFieldValue] = useState(value)

    return (
        <input
            className={style.input} 
            type='text' 
            name={name} 
            onChange={(e) => {
                setFieldValue(e.target.value)
                onchange(index, whatChange, e.target.value)
            }} 
            value={fieldValue}
        />
    )
}