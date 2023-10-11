import './css/style.css'
import ListItem from './model/ListItems'
import FullList from './model/FullList'
import Template from './templates/template'

const initApp = ():void => {
    const fullList = FullList.instance
    const template = Template.instance

    const itemForm = document.getElementById("itemEntryForm") as HTMLFormElement

    itemForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()

        const input = document.getElementById("newItem") as HTMLInputElement

        const inputText = input.value.trim()
        
        const itemId:number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

        const newItem = new ListItem(itemId.toString(), inputText)
        fullList.addList(newItem)
        template.render(fullList)
        input.value = ''
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
    clearItems.addEventListener("click", (): void => {
        fullList.clearList()
        template.clear()


    })
    fullList.load()
    template.render(fullList)
}
document.addEventListener("DOMContentLoaded", initApp)