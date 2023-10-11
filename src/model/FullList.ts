import ListItem from './ListItems'

export interface List {
    list:ListItem[],
    load():void,
    save():void,
    clearList():void,
    addList(item:ListItem):void,
    removeList(id:string):void
}
export default class FullList implements List {
    static instance: FullList = new FullList()
     constructor(
        private _list:ListItem[] = []
     ){}
     get list():ListItem[]{
        return this._list
     }

     load(): void {
         const loadList: string | null = localStorage.getItem('myList')
         if (typeof loadList !== "string") return
         const parseList:{_id:string, _item:string, _check:boolean}[] = JSON.parse(loadList)
         parseList.forEach( el => {
            const newItem = new ListItem(el._id, el._item, el._check)
            FullList.instance.addList(newItem)
         })
     }
     save():void{
        localStorage.setItem('myList', JSON.stringify(this._list))
     }
     
     clearList(): void {
         this._list = []
         this.save()
     }
     addList(item: ListItem): void {
         this._list.push(item)
         this.save()
     }
     removeList(id: string): void {
         this._list = this._list.filter(el => el.id !== id)
         this.save()
     }
}