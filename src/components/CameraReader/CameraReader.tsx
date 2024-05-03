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
                <video ref={CameraReaderStore.videoRef} autoPlay playsInline></video>
                <div className={styles.aim} style={{
                    width: CameraReaderStore.canvasParams.width,
                    height: CameraReaderStore.canvasParams.height,
                    top: `calc((100% - ${CameraReaderStore.canvasParams.height}px + 8px) / 2)`,
                    left: `calc((100% - ${CameraReaderStore.canvasParams.width}px - 14px) / 2)`,
                }}/>
                {/*<canvas id={"frame"} className={styles.aim}/>*/}
            </> :
            <div className={"button__white"}>
                <Camera/>
                Предоставить доступ к камере
            </div>
    )
})

export default CameraReader