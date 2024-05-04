import {FC} from "react";
import {observer} from "mobx-react-lite";
import CopyButton from "../CopyButton/CopyButton.tsx";
import styles from "./Results.module.scss";
import ResultsStore from "./Results.store.ts";

const Results: FC = observer(() => {
    function replaceLinks(text: string) {
        const linkRegex = /(https?:\/\/[^\s]+|\b\w+\.\w{2,3}\b)/g;
        const parts = text.split(linkRegex);

        return parts.map((part, idx) => {
            if (part.match(linkRegex)) {
                if( part.indexOf("https") === -1 )
                    part = "https://" + part

                return (
                    <a key={idx} href={part} target="_blank" rel="noopener noreferrer">
                        {part}
                    </a>
                );
            } else {
                return <span key={idx}>{part}</span>;
            }
        });
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
                                <p>{replaceLinks(result.text)}</p>
                                <img src={result.src} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>

    )
})

export default Results