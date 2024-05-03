import {makeAutoObservable} from "mobx";
import {readBarcodesFromImageFile, ReaderOptions} from "zxing-wasm/reader";
import {IResults, ResultsType} from "../models/types.ts";
import toast from "react-hot-toast";

const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: [],
    maxNumberOfSymbols: 1,
};

class QrReaderStore {
    results: ResultsType = []

    constructor() {
        makeAutoObservable(this)
    }

    get reverseResults(): ResultsType {
        return this.results.length > 0 ? this.results.slice().sort((a, b) => b.id - a.id) : []
    }

    addResult(result: IResults) {
        const lastId = this.results.length === 0 ? 0 : this.results[this.results.length - 1].id;
        result.id = lastId + 1

        this.results = [...this.results, result];
    }

    async readImage(image: string) {
        const blob = await fetch(image).then((resp) => resp.blob());
        const imageFileReadResults = await  this.readBlob(blob);

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