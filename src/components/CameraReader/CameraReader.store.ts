import {makeAutoObservable} from "mobx";
import {createRef} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";

class CameraReaderStore {
    stream: MediaStream | null = null
    videoRef = createRef<HTMLVideoElement>()
    canvasRef = createRef<HTMLCanvasElement>()
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

        if (res.length > 0) {
            console.log(res)
        }
    }

    drawBorder(x: number, y: number, video: HTMLVideoElement) {
        const canvas = this.canvasRef.current;
        if (!canvas || !video) return

        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        const context = canvas.getContext('2d');
        if (!context) return

        context.strokeStyle = "#FF0000";
        context.strokeRect(x, y, canvas.width - x, canvas.height - y);
    }

    readCameraFrame() {
        const canvas = document.getElementById("frame") || document.createElement("canvas");
        const video = this.videoRef.current;

        if (!canvas || !video) return

        // video.insertAdjacentElement('afterend', canvas);
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        const context = canvas.getContext('2d');
        if (!context) return

        const [x, y] = [200, 10]

        context.drawImage(video, x, y, canvas.width - x, canvas.height - y);
        this.drawBorder(x, y, video)

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