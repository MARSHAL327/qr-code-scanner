import {makeAutoObservable} from "mobx";
import {createRef} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";
import ResultsStore from "../Results/Results.store.ts";

interface ICanvasParams{
    width: number;
    height: number;
}

/**
 * Класс для считывания qr кода с камеры
 */
class CameraReaderStore {
    stream: MediaStream | null = null
    videoRef = createRef<HTMLVideoElement>()
    canvasParams: ICanvasParams = {
        width: 200,
        height: 200,
    }
    cameraLoading: boolean = true
    cameraStopped: boolean = true
    scannedSuccess: boolean = false
    constraints: MediaStreamConstraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440,
            },
            facingMode: "user"
        },
    };

    /**
     * Обрабатывает кадр и если обнаружен qr, добавляет его в массив
     *
     * @param blob
     */
    async processFrame(blob: Blob) {
        this.scannedSuccess = true
        const res = await QrReaderStore.readBlob(blob)

        if (res.length <= 0 || this.cameraStopped) return

        ResultsStore.addResult({
            src: URL.createObjectURL(blob),
            text: res[0].text,
            id: 0
        })

        this.stopCamera()
    }

    /**
     * Добавляет кадр на canvas
     */
    readCameraFrame() {
        const canvas = document.createElement("canvas");
        const video = this.videoRef.current;

        if (!canvas || !video) return

        canvas.width = this.canvasParams.width;
        canvas.height = this.canvasParams.height;

        const context = canvas.getContext('2d');
        if (!context) return

        context.drawImage(
            video,
            -(video.clientWidth - canvas.width) / 2,
            -(video.clientHeight - canvas.height) / 2,
            video.clientWidth,
            video.clientHeight
        );

        canvas.toBlob((blob) => {
            if (!blob) return

            this.processFrame(blob);
        }, 'image/jpeg', 0.9);

        requestAnimationFrame(this.readCameraFrame.bind(this));
    }

    /**
     * Запускает стрим камеры. Сбрасывает все параметры. Добавляет стрим в тег video
     */
    async startCamera() {
        this.scannedSuccess = false
        this.cameraStopped = false
        this.cameraLoading = true

        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            if (this.videoRef?.current) {
                this.videoRef.current.srcObject = this.stream;
                this.readCameraFrame()
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }

        this.cameraLoading = false
    }

    /**
     * Останавливает камеру. Пробегается по всем стримам и останавливает их.
     */
    stopCamera = () => {
        if (!this.stream)
            return

        const tracks = this.stream.getTracks();
        tracks.forEach(track => track.enabled = false);

        this.cameraStopped = true
    };

    constructor() {
        makeAutoObservable(this)
    }
}

export default new CameraReaderStore();