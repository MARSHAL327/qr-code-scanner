import {makeAutoObservable} from "mobx";
import {IResults, ResultsType} from "../../models/types.ts";

interface ITemplates{
    regex: RegExp,
    call: (match: string, ...params: string[]) => string
}

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

    /**
     * Функция для преобразлвания ссылок, wifi, телефонов и email в кликабельные ссылки
     * Есть шаблон с помощью которго можно добавить новый тип преобразования
     *
     * @param text
     */
    processingTemplates(text: string) {
        const templates: ITemplates[] = [
            {
                regex: /tel:((?:\+|\d)[\d\-\(\) ]{9,}\d)/gi,
                call: replaceLink
            },
            {
                regex: /mailto:(.*@.*\.[A-Z]{2,4})/gi,
                call: replaceLink
            },
            {
                regex: /(https?:\/\/[^\s]+)/gi,
                call: replaceLink
            },
            {
                regex: /WIFI:\S:(.*?);T:(.*?);P:(.*?)(?:;H:(.*?))?;;/g,
                call: replaceWifi
            }
        ]

        function replaceLink(match: string, ...params: string[]) {
            return `<a href="${match}">${params[0]}</a>`;
        }

        function replaceWifi(_match: string, ...params: string[]) {
            const wifiFields = {
                "Название": params[0],
                "Тип": params[1],
                "Пароль": params[2],
                "Скрытая сеть": params[3],
            }

            return Object
                .entries(wifiFields)
                .map(([key, value]) => (value ? `${key}: ${value}` : ""))
                .join("<br>");
        }

        templates.map(template => {
            text = text.replace(template.regex, template.call);
        })

        return text
    }

    constructor(){
        makeAutoObservable(this)
    }
}

export default new ResultsStore();