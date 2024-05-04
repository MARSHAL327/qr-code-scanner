import style from "./QrFileReader.module.scss";
import Image from "../../assets/icons/Image.svg?react"
import {FC} from "react";
import {observer} from "mobx-react-lite";
import QrFileReaderStore from "./QrFileReader.store.ts";

const QrFileReader: FC = observer(() => {
    return (
        <>
            <label className={"button__white"}>
                <input id="file-upload" type="file" onChange={QrFileReaderStore.handleFileChange.bind(QrFileReaderStore)}/>
                <Image/>
                Выбрать изображение
            </label>
            <p className={"text__white " + style.text__white}>
                или перетащите его в это поле
            </p>
        </>

    )
})

export default QrFileReader