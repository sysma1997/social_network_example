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
        body: string | FormData | null,
        action?: (response: Response) => any): Promise<Response> {
        try {
            let headers: any = {
                'Content-Type': 'application/json'
            }

            const token = localStorage.getItem("token")
            if (token !== null)
                headers["Authorization"] = `Bearer ${token}`
            if (body) if (typeof body === "object")
                delete headers["Content-Type"]

            const response = await fetch(`${process.env.API}/api/${api}`, {
                method: method,
                headers: headers,
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