import { v4, validate } from 'uuid'

export class UuidValue {
    readonly value: string

    constructor(value: string) {
        if (!validate(value)) {
            throw new Error(`Uuid: '${value}' not valid.`)
        }

        this.value = value
    }

    static Generate(): UuidValue {
        return new UuidValue(v4())
    }
}