import Camera from "../../assets/icons/Camera.svg?react"
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import CameraReaderStore from "./CameraReader.store.ts";
import styles from "./CameraReader.module.scss"

const CameraReader: FC = observer(() => {
    const [canvasWidth, canvasHeight] = [CameraReaderStore.canvasParams.width, CameraReaderStore.canvasParams.height]

    useEffect(() => {
        CameraReaderStore.startCamera()

        return CameraReaderStore.stopCamera;
    }, []);

    return (
        CameraReaderStore.stream ?
            <>
                <video ref={CameraReaderStore.videoRef} autoPlay playsInline></video>
                <div className={styles.aim} style={{
                    width: canvasWidth,
                    height: canvasHeight,
                    top: `calc((100% - ${canvasHeight}px) / 2)`,
                    left: `calc((100% - ${canvasWidth}px) / 2)`,
                }}/>
            </> :
            <div className={"center"} style={{gap: 10}}>
                <Camera style={{fill: "#fff"}} />
                <p className={"text__white"}>Предоставьте доступ к камере</p>
            </div>
    )
})

export default CameraReader