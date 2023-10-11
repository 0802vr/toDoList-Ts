import FullList from "../model/FullList";
interface template {
    ul:HTMLUListElement,
    clear():void,
    render(item:FullList):void
}
export default class Template implements template{
    ul: HTMLUListElement;
    static instance: Template = new Template()
    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }
    clear(): void {
        this.ul.innerHTML = ''
    }
    render(item: FullList): void {
        this.clear()
        item.list.forEach(el => {

            const li = document.createElement('li')
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = el.id
            check.checked = el.check
            li.append(check)

            check.addEventListener('change', () => {
                el.check = !el.check
                item.save()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = el.id
            label.textContent = el.item
            li.append(label)


            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                item.removeList(el.id)
                this.render(item)
            })


            this.ul.append(li)
            
        });
        
    }
}