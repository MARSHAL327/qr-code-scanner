import {makeAutoObservable} from "mobx";

class CopyButtonStore {
    textIsCopied: boolean = false

    async copyText(text: string) {
        this.textIsCopied = true
        await navigator.clipboard.writeText(text)

        setTimeout(() => {
            this.textIsCopied = false
        }, 750);
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new CopyButtonStore()