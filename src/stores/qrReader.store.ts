import {makeAutoObservable} from "mobx";
import {readBarcodesFromImageFile, ReaderOptions} from "zxing-wasm/reader";
import toast from "react-hot-toast";

const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: [],
    maxNumberOfSymbols: 1,
};

/**
 * Класс для работы с qr кодами
 */
class QrReaderStore {
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * Получает изображение, преобразует в blob и считывает qr код с картинки
     *
     * @param image Исходное изображение в виде строки
     * @returns Возвращает массив считанных qr кодов или null если
     */
    async readImage(image: string) {
        const blob = await fetch(image).then((resp) => resp.blob());
        const imageFileReadResults = await this.readBlob(blob);

        if( imageFileReadResults.length === 0 || !imageFileReadResults[0].isValid ){
            toast.error('При считывании произошла ошибка')
            return null;
        }

        return imageFileReadResults
    }

    /**
     * Читает blob данные и скаинрует с них qr код
     *
     * @param imageFile
     * @returns Возвращает массив считанных qr кодов
     */
    async readBlob(imageFile: Blob) {
        return await readBarcodesFromImageFile(
            imageFile,
            readerOptions,
        );
    }
}

export default new QrReaderStore()