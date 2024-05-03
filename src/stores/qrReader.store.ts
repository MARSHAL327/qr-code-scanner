import {makeAutoObservable} from "mobx";
import {readBarcodesFromImageFile, ReaderOptions} from "zxing-wasm/reader";
import toast from "react-hot-toast";

const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: [],
    maxNumberOfSymbols: 1,
};

class QrReaderStore {

    constructor() {
        makeAutoObservable(this)
    }

    async readImage(image: string) {
        const blob = await fetch(image).then((resp) => resp.blob());
        const imageFileReadResults = await this.readBlob(blob);

        if( imageFileReadResults.length === 0 || !imageFileReadResults[0].isValid ){
            toast.error('При считывании произошла ошибка')
            return null;
        }

        return imageFileReadResults
    }

    async readBlob(imageFile: Blob) {
        return await readBarcodesFromImageFile(
            imageFile,
            readerOptions,
        );
    }
}

export default new QrReaderStore()