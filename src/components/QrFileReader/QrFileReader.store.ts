import {makeAutoObservable} from "mobx";
import {ChangeEvent, DragEvent} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";
import ResultsStore from "../Results/Results.store.ts";

/**
 *
 * Класс для обработки данных из файла
 *
 */
class QrFileReaderStore {
    dragIsActive = false

    /**
     * Добавляет файл в таблицу результатов.
     * Считывает изображение из параметра, затем считывает qr код
     * и если qr код есть, он добавляется в общую таблицу результатов
     *
     * @param file
     */
    addFileToResults (file: File | undefined ) {
        if(!file) return

        const reader = new FileReader();

        reader.onload = async (e) => {
            const contents = e.target?.result as string;
            const imageFileReadResults = await QrReaderStore.readImage(contents)

            if(!imageFileReadResults) return

            ResultsStore.addResult({
                text: imageFileReadResults[0].text,
                src: contents,
                id: 0,
            })
        };

        reader.readAsDataURL(file);
    }

    /**
     * Для обработки событий dragenter, dragover, dragleave
     *
     * @param e
     */
    handleDrag (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            this.dragIsActive = true
        } else if (e.type === "dragleave") {
            this.dragIsActive = false
        }
    }

    /**
     * Для обработки события, когда пользователь отпускает объект
     *
     * @param e
     */
    handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.dragIsActive = false

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.addFileToResults(e.dataTransfer.files[0]);
        }
    }

    /**
     * Используется для обработки ChangeEvent
     *
     * @param input
     */
    handleFileChange(input: ChangeEvent<HTMLInputElement>) {
        this.addFileToResults(input.target.files?.[0])
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new QrFileReaderStore()