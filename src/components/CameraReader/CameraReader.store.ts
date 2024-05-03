import {makeAutoObservable} from "mobx";
import {createRef} from "react";
import QrReaderStore from "../../stores/qrReader.store.ts";

declare class ImageCapture {
    constructor(videoTrack: MediaStreamTrack);

    grabFrame(): Promise<ImageBitmap>;
}

class CameraReaderStore {
    stream: MediaStream | null = null
    videoRef = createRef<HTMLthis.videoRef.current>()
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

    // async handleDataAvailable(event) {
    //     if (event.data.size > 0) {
    //         const data: Blob = event.data;
    //         // I think I need to pipe to an intermediate stream? Not sure how tho
    //         data.stream().pipeTo(writable);
    //     }
    // }

    async processFrame(blob: Blob) {
        const res = await QrReaderStore.readBlob(blob)

        if (res.length > 0) {
            console.log(res)
        }
    }

    readCameraFrame() {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;

        const context = canvas.getContext('2d');
        if (!context) return

        context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob( (blob) => {
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