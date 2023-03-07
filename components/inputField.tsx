import style from '../styles/modules/inputField.module.scss'

interface IInputField {
    name: string
    onchange: Function
    value: number | string
}

export default function InputField({name, onchange, value}: IInputField) {
    return (
        <input
            className={style.input} 
            type="text" 
            name={name} 
            onChange={() => onchange} 
            value={value}
        />
    )
}