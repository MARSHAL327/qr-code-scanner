import {makeAutoObservable} from "mobx";
import {IResults, ResultsType} from "../../models/types.ts";

class ResultsStore{
    results: ResultsType = []

    get reverseResults(): ResultsType {
        return this.results.length > 0 ? this.results.slice().sort((a, b) => b.id - a.id) : []
    }

    addResult(result: IResults) {
        const lastId = this.results.length === 0 ? 0 : this.results[this.results.length - 1].id;
        result.id = lastId + 1

        this.results = [...this.results, result];
    }

    constructor(){
        makeAutoObservable(this)
    }
}

export default new ResultsStore();