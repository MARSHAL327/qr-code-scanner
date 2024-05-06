import {FC} from "react";
import {observer} from "mobx-react-lite";
import CopyButton from "../CopyButton/CopyButton.tsx";
import styles from "./Results.module.scss";
import ResultsStore from "./Results.store.ts";

interface ITemplates{
    regex: RegExp,
    call: (match: string, ...params: string[]) => string
}

const Results: FC = observer(() => {
    function processingTemplates(text: string) {
        const templates: ITemplates[] = [
            {
                regex: /(https?:\/\/[^\s]+|\b\w+\.\w{2,3}\b)/g,
                call: replaceLink
            },
            {
                regex: /WIFI:\S:(.*?);T:(.*?);P:(.*?)(?:;H:(.*?))?;;/g,
                call: replaceWifi
            }
        ]

        function replaceLink(match: string, ...params: string[]) {
            if( match.indexOf("https") === -1 )
                match = "https://" + params[0]

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
                .join("<br> ");
        }

        templates.map(template => {
            text = text.replace(template.regex, template.call);
        })

        return text
    }

    return (
        ResultsStore.reverseResults.length > 0 &&
            <div className={styles.results}>
                {
                    ResultsStore.reverseResults.map((result) => (
                        <div className={styles.results__item} key={result.id}>
                            <div className={styles.results__item__title}>
                                <CopyButton text={result.text} key={result.id}/>
                                <span>Сканирование #{result.id}</span>
                            </div>
                            <div className={styles.results__item__content}>
                                <p dangerouslySetInnerHTML={{ __html: processingTemplates(result.text) }}></p>
                                <img src={result.src} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>

    )
})

export default Results