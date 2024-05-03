import Camera from "../../assets/icons/Camera.svg?react"
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import CameraReaderStore from "./CameraReader.store.ts";
import styles from "./CameraReader.module.scss"

const CameraReader: FC = observer(() => {
    useEffect(() => {
        CameraReaderStore.startCamera()

        return CameraReaderStore.stopCamera;
    }, []);

    return (
        CameraReaderStore.stream ?
            <>
                <canvas ref={CameraReaderStore.canvasRef} className={styles.videoFrame}/>
                <video ref={CameraReaderStore.videoRef} autoPlay playsInline></video>
                <canvas id={"frame"} className={styles.videoFrame}/>
            </> :
            <div className={"button__white"}>
            <Camera/>
                Предоставить доступ к камере
            </div>
    )
})

export default CameraReader