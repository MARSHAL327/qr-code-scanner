import Camera from "../../assets/icons/Camera.svg?react"
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import CameraReaderStore from "./CameraReader.store.ts";
import "./CameraReader.module.scss"

const CameraReader: FC = observer(() => {
    useEffect(() => {
        CameraReaderStore.startCamera()

        return CameraReaderStore.stopCamera;
    }, []);

    return (
        CameraReaderStore.stream ?
            <>
                <video ref={CameraReaderStore.videoRef} autoPlay playsInline></video>
                <img src="" alt="" id={"video-frame"}/>
            </> :
            <div className={"button__white"}>
            <Camera/>
                Предоставить доступ к камере
            </div>
    )
})

export default CameraReader