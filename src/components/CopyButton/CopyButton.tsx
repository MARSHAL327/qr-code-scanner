import {FC} from "react";
import Copy from "../../assets/icons/Copy.svg?react"
import {observer} from "mobx-react-lite";
import styles from "./CopyButton.module.scss";
import CopyButtonStore from "./CopyButton.store.ts";

interface CopyButtonProps {
    text: string;
}

const CopyButton: FC<CopyButtonProps> = observer(({text}) => {
    console.log(styles)
    return (
        <div className={styles.copyBtn} onClick={CopyButtonStore.copyText.bind(CopyButtonStore, text)}>
            <Copy/>
            {CopyButtonStore.textIsCopied ? "Скопировано!" : "Копировать"}
        </div>

    )
})

export default CopyButton