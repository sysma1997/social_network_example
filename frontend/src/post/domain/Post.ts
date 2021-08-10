export class Post {
    readonly id: string
    readonly userId: string

    readonly title: string
    readonly description: string
    readonly date: Date
    readonly image: string | null

    constructor(jsonString?: string) {
        if(jsonString != null) {
            const user = JSON.parse(jsonString)
            
            if(user.id) this.id = user.id
            else this.id = ""
            if(user.userId) this.userId = user.userId
            else this.userId = ""
            if(user.title) this.title = user.title
            else this.title = ""
            if(user.description) this.description = user.description
            else this.description = ""
            if(user.date) this.date = user.date
            else this.date = new Date()
            if(user.image) this.image = user.image
            else this.image = ""
        }
        else {
            this.id = ""
            this.userId = ""
            this.title = ""
            this.description = ""
            this.date = new Date()
            this.image = ""
        }
    }
}