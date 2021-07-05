export class EmailValue {
    readonly value: string

    constructor(value: string) {
        if(!EmailValue.Validate(value)) {
            throw new Error(`Email: '${value}' not is email valid.`)
        }

        this.value = value
    }

    static Validate(value: string): boolean {
        let valid = true
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            valid = false
        }

        return valid
    }
}