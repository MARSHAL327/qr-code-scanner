import Camera from "../../assets/icons/Camera.svg?react"
import Spinner from "../../assets/icons/Spinner.svg?react"
import Reload from "../../assets/icons/Reload.svg?react"
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import CameraReaderStore from "./CameraReader.store.ts";
import styles from "./CameraReader.module.scss"
import "./../../assets/scss/spinner.scss"

const CameraReader: FC = observer(() => {
    const [canvasWidth, canvasHeight] = [CameraReaderStore.canvasParams.width, CameraReaderStore.canvasParams.height]

    useEffect(() => {
        CameraReaderStore.startCamera()

        return CameraReaderStore.stopCamera;
    }, []);

    if (CameraReaderStore.stream) {
        return (
            <>
                <video ref={CameraReaderStore.videoRef} autoPlay playsInline></video>
                {
                    CameraReaderStore.stream && !CameraReaderStore.cameraStopped &&
                    <div className={styles.aim} style={{
                        width: canvasWidth,
                        height: canvasHeight,
                        top: `calc((100% - ${canvasHeight}px) / 2)`,
                        left: `calc((100% - ${canvasWidth}px) / 2)`,
                    }}/>
                }
                {
                    CameraReaderStore.cameraStopped &&
                    (
                        <div style={{position: "absolute"}}>
                            {CameraReaderStore.scannedSuccess && <div className={styles.scannedSuccess}>Успешно отсканированно!</div>}
                            <div
                                className={"button__white"}
                                onClick={CameraReaderStore.startCamera.bind(CameraReaderStore)}
                            >
                                <Reload/>
                                Перезапустить камеру
                            </div>
                        </div>
                    )

                }

            </>
        )
    } else if (CameraReaderStore.cameraLoading) {
        return (
            <div className={"text__white center gap-10"}>
                <Spinner className={"spinner"}/>
                Загрузка камеры...
            </div>
        )
    }

    return (
        <div className={"center gap-10"}>
            <Camera style={{fill: "#fff"}}/>
            <p className={"text__white"}>Предоставьте доступ к камере</p>
        </div>
    )
})

export default CameraReader