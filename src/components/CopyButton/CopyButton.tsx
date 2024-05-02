import {FC, useState} from "react";
import Copy from "../../assets/icons/Copy.svg?react"
import {observer} from "mobx-react-lite";
import styles from "./CopyButton.module.scss";

interface CopyButtonProps {
    text: string;
}

const CopyButton: FC<CopyButtonProps> = observer(({text}) => {
    const [textIsCopied, setTextIsCopied] = useState(false);

    async function copyText(text: string) {
        setTextIsCopied(true)
        await navigator.clipboard.writeText(text)

        setTimeout(() => {
            setTextIsCopied(false)
        }, 750);
    }

    return (
        <div className={styles.copyBtn} onClick={copyText.bind(null, text)}>
            <Copy/>
            {textIsCopied ? "Скопировано!" : "Копировать"}
        </div>

    )
})

export default CopyButton