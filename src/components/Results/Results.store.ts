import {makeAutoObservable} from "mobx";
import {IResults, ResultsType} from "../../models/types.ts";

/**
 *
 * Класс для обработки результатов
 *
 */
class ResultsStore{
    results: ResultsType = []

    /**
     * Для получения результатов в обратном порядке, чтобы свеживе были сверху
     */
    get reverseResults(): ResultsType {
        return this.results.length > 0 ? this.results.slice().sort((a, b) => b.id - a.id) : []
    }

    /**
     * Добавление результатов. Чтобы посчитать id, берётся id последнего элемента и прибавляется 1
     * Если результатов ещё нет, id берётся за 0
     *
     * @param result
     */
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