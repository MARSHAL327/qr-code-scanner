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

    drawToDom(imageBitmap: ImageBitmap){
        const imageElement: HTMLElement | null = document.getElementById("video-frame")

        if(imageElement)
            imageElement.src = URL.createObjectURL(imageBitmap);
    }

    processFrame(imageBitmap: ImageBitmap) {
        // console.log(imageBitmap)
    }

    readCameraFrame() {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;

        const context = canvas.getContext('2d');
        if( !context ) return

        context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                const imageElement: any = document.getElementById("video-frame")
                imageElement.src = URL.createObjectURL(blob);

                createImageBitmap(blob)
                    .then((imageBitmap) => {
                        // Обработка полученного кадра
                        this.processFrame(imageBitmap);

                        // Запуск считывания следующего кадра
                        requestAnimationFrame(this.readCameraFrame.bind(this));
                    })
                    .catch((error) => {
                        console.error('Ошибка создания ImageBitmap:', error);
                    });
            }
        }, 'image/jpeg', 0.9);
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            if (this.videoRef?.current) {
                this.videoRef.current.srcObject = this.stream;

                this.readCameraFrame()

                // Считывание кадров с камеры


            // const mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'});
            // const recordedChunks: BlobPart[] | undefined = [];
            //     console.log(mediaRecorder)
            //
            // mediaRecorder.addEventListener('dataavailable', function (event) {
            //     console.log(event.data)
            //
            //     const recordedBlob = new Blob([event.data], {type: 'video/webm'});
            //
            //     // recordedChunks.push(event.data);
            //     QrReaderStore.readQrBlob(recordedBlob)
            //
            //     mediaRecorder.requestData();
            // });
            //
            // mediaRecorder.start();
            //
            // setTimeout(function () {
            //     console.log(recordedChunks)
            //     mediaRecorder.stop();
            // }, 2000);
            //
            // mediaRecorder.addEventListener('stop', function () {
            //     console.log("stopped")
            //     // console.log(recordedChunks)
            //     // const recordedBlob = new Blob(recordedChunks, {type: 'video/webm'});
            //     //
            //     // QrReaderStore.readQrBlob(recordedBlob)
            //     // console.log(recordedBlob)
            //
            //     // Save the recorded blob to a file or do something else with it
            // });

                // const mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/webm' });
                // mediaRecorder.ondataavailable = this.handleDataAvailable;
                //
                // mediaRecorder.start(1000);


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