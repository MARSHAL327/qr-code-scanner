import {FC} from "react";
import {observer} from "mobx-react-lite";
import CopyButton from "../CopyButton/CopyButton.tsx";
import styles from "./Results.module.scss";
import ResultsStore from "./Results.store.ts";

const Results: FC = observer(() => {
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
                                <p dangerouslySetInnerHTML={{ __html: ResultsStore.processingTemplates(result.text) }}></p>
                                <img src={result.src} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>

    )
})

export default Results