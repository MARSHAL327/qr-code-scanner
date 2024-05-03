import {makeAutoObservable} from "mobx";
import {ChangeEvent, DragEvent} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";

class QrFileReaderStore {
    dragIsActive = false

    handleFileChange (input: ChangeEvent<HTMLInputElement> & FileList) {
        const file = input.target?.files?.[0] || input[0];
        if(!file) return

        const reader = new FileReader();

        reader.onload = async (e) => {
            const contents = e.target?.result as string;
            const imageFileReadResults = await QrReaderStore.readImage(contents)

            if(!imageFileReadResults) return

            QrReaderStore.addResult({
                text: imageFileReadResults[0].text,
                src: contents,
                id: 0,
            })
        };

        reader.readAsDataURL(file);
    }

    handleDrag (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            this.dragIsActive = true
        } else if (e.type === "dragleave") {
            this.dragIsActive = false
        }
    }

    handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.dragIsActive = false

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleFileChange(e.dataTransfer.files);
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new QrFileReaderStore()