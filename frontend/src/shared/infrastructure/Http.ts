export class Response {
    public readonly status: Number
    public readonly result: string

    constructor(status: Number, result: string) {
        this.status = status
        this.result = result
    }

    toString(): string {
        return JSON.stringify({
            status: this.status,
            result: this.result
        })
    }
}
export class Http {
    static async Init(method: string,
        api: string,
        body: string | null,
        action?: (response: Response) => any): Promise<Response> {
        try {
            const response = await fetch(`${process.env.API}/api/${api}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })

            const status = response.status
            const result = await response.text()
            const res = new Response(status, result)

            if (action) action(res)

            return res
        } catch (error: any) {
            throw new Error(error)
        }
    }
}