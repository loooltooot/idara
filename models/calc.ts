import { IField } from "./field";

enum Category {
    PLAN,
    FACT
}

export function calcOutput(fields: IField[], whatCalc: string) {
    let output = ''

    const [planNumeric, planDesc] = multiplyFields(fields, Category.PLAN)
    const [factNumeric, factDesc] = multiplyFields(fields, Category.FACT)

    output += planDesc + '\n'
    output += factDesc + '\n\n'

    const absoluteDelta = round(+factNumeric - +planNumeric)
    const relativeDelta = round(+factNumeric / +planNumeric * 100)

    output += `Δабс = ${factNumeric} - ${planNumeric} = ${absoluteDelta} \n`
    output += `Δотн = ${factNumeric} / ${planNumeric} * 100% = ${relativeDelta}% \n`

    output += chainMethod()

    return output
    
    function multiplyFields(fields: IField[], category: Category) {
        let product = 1
        let desc = `${whatCalc}`
    
        switch(category) {
            case Category.PLAN:
                desc += 'п = '
                fields.forEach(field => {
                    desc += round(field.planValue) + ' * '
                    product *= field.planValue
                })
                break
            case Category.FACT:
                desc += 'ф = '
                fields.forEach(field => {
                    desc += round(field.factValue) + ' * '
                    product *= field.factValue
                })
                break
            default:
                console.log('ERROR')
                break
        }
    
        product = round(product)
        desc = desc.substring(0, desc.length - 2) + ' = ' + round(product)

        return [product, desc]
    }

    function round(number: number) {
        const temp = Math.floor(number)
        const afterPoint = number - temp

        return afterPoint != 0 ? +number.toFixed(2) : number
    }

    function chainMethod() {
        let output = ''
        let temp: IField[] = JSON.parse(JSON.stringify(fields))
        let previousValue = +planNumeric
        let deltas: number[] = []

        temp.forEach((field, index) => {
            temp[index].planValue = field.factValue
            const [currentValue, _] = multiplyFields(temp, Category.PLAN)

            let iterationOutput = ''
            iterationOutput += `\n${whatCalc}${index + 1} = `
            temp.forEach(value => {
                iterationOutput += round(value.planValue) + ' * '
            })
            iterationOutput = iterationOutput.substring(0, iterationOutput.length - 2) + ' = ' + currentValue + '\n'
            output += iterationOutput

            const delta = round(+currentValue - previousValue)
            output += `${whatCalc}${index + 1} - ${whatCalc}${index == 0 ? 'п' : index} = ${currentValue} - ${previousValue} = ${delta}`  + '\n'
            deltas.push(delta)

            output += analyze(field.name, previousValue, +currentValue, delta, index)
            
            previousValue = +currentValue
        })

        let deltasSum = 0
        deltas.forEach(delta => {
            deltasSum += delta
        })
        output += `\nПроверка: ${deltas.join(' + ')} = ${round(deltasSum)} (Δабс = ${absoluteDelta})`

        return output
    }

    function analyze(
            name: string, 
            previousValue: number, 
            currentValue: number, 
            delta: number,
            index: number
        ) {
        
        let diff = ''
        let planDiff = ''
        const planDelta = round(fields[index].factValue - fields[index].planValue)

        switch(true) {
            case currentValue > previousValue:
                diff = 'увеличилось'
                break
            case currentValue < previousValue:
                diff = 'уменьшилось'
                break
            case currentValue == previousValue:
                diff = 'не изменилось'
                break
        }

        switch(true) {
            case fields[index].factValue > fields[index].planValue:
                planDiff = 'увеличилось'
                break
            case fields[index].factValue < fields[index].planValue:
                planDiff = 'уменьшилось'
                break
            case fields[index].factValue == fields[index].planValue:
                planDiff = 'не изменилось'
                break
        }

        return `${whatCalc} ${diff} ${diff != 'не изменилось' ? 'на ' + Math.abs(delta) : ''} 
            из-за того, что ${name} ${planDiff} ${planDiff != 'не изменилось' ? 'на ' + Math.abs(planDelta) : ''}\n`
    }
}