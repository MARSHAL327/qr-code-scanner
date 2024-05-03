import {makeAutoObservable} from "mobx";
import {createRef} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";
import qrReaderStore from "../../stores/qrReader.store.ts";

class CameraReaderStore {
    stream: MediaStream | null = null
    videoRef = createRef<HTMLVideoElement>()
    canvasParams = {
        width: 200,
        height: 200,
    }
    constraints = {
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
        },
    };

    async processFrame(blob: Blob) {
        const res = await QrReaderStore.readBlob(blob)

        if (res.length <= 0) return

        qrReaderStore.addResult({
            src: URL.createObjectURL(blob),
            text: res[0].text,
            id: 0
        })

        this.stopCamera()
    }

    readCameraFrame() {
        const canvas = document.getElementById("frame") as HTMLCanvasElement || document.createElement("canvas");
        const video = this.videoRef.current;

        if (!canvas || !video) return

        canvas.width = this.canvasParams.width;
        canvas.height = this.canvasParams.height;

        const context = canvas.getContext('2d');
        if (!context) return

        context.drawImage(
            video,
            -canvas.width / 1.5,
            -canvas.height / 5,
            video.clientWidth,
            video.clientHeight
        );

        canvas.toBlob((blob) => {
            if (!blob) return

            this.processFrame(blob);
        }, 'image/jpeg', 0.9);

        requestAnimationFrame(this.readCameraFrame.bind(this));
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            if (this.videoRef?.current) {
                this.videoRef.current.srcObject = this.stream;
                this.readCameraFrame()
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    stopCamera = () => {
        if (!this.videoRef.current || !this.videoRef.current.srcObject)
            return

        const stream = this.videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    };

    constructor() {
        makeAutoObservable(this)
    }
}

export default new CameraReaderStore();