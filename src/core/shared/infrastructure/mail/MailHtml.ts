import fs from "fs"

export const MailHtml = (template: string, 
    name: string, 
    link: string): string => {
    let html = fs.readFileSync(`./assets/emails/${template}.html`).toString()

    html = html.replace("${name}", name)
    html = html.replace("${link}", link)

    return html
}