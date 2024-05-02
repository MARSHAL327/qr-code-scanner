import "./QrFileReader.module.scss";
import Image from "../../assets/icons/Image.svg?react"
import {ChangeEvent, FC} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";
import {observer} from "mobx-react-lite";

const QrFileReader: FC = observer(() => {
    const handleFileChange = (input: ChangeEvent<HTMLInputElement>) => {
        const file = input.target.files?.[0];
        if(!file) return

        const reader = new FileReader();

        reader.onload = async (e) => {
            const contents = e.target?.result as string;
            const imageFileReadResults = await QrReaderStore.readQr(contents)

            if(!imageFileReadResults) return

            QrReaderStore.addResult({
                text: imageFileReadResults[0].text,
                src: contents,
                id: 0,
            })
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <label className={"button__white"}>
                <input id="file-upload" type="file" onChange={handleFileChange}/>
                <Image/>
                Выбрать изображение
            </label>
            <p className={"text__white"}>
                или перетащите его в это поле
            </p>
        </>

    )
})

export default QrFileReader