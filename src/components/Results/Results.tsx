import {FC} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";
import {observer} from "mobx-react-lite";

const Results: FC = observer(() => {
    function replaceLinks(text: string) {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(linkRegex);

        return parts.map((part, idx) => {
            if (part.match(linkRegex)) {
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
        QrReaderStore.reverseResults.length > 0 &&
            <div className={"results"}>
                {
                    QrReaderStore.reverseResults.map((result) => (
                        <div className={"results__item white-block"} key={result.id}>
                            <p className={"results__item__title"}>Сканирование #{result.id}</p>
                            <div className={"results__item__content"}>
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