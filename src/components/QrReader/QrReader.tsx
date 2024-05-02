import {
    readBarcodesFromImageFile,
    readBarcodesFromImageData,
    type ReaderOptions,
} from "zxing-wasm/reader";

const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: ["QRCode"],
    maxNumberOfSymbols: 1,
};

/**
 * Read from image file/blob
 */
const imageFile = await fetch(
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hello%20world!",
).then((resp) => resp.blob());

const imageFileReadResults = await readBarcodesFromImageFile(
    imageFile,
    readerOptions,
);

console.log(imageFileReadResults[0].text); // Hello world!

/**
 * Read from image data
 */
const imageData = await createImageBitmap(imageFile).then((imageBitmap) => {
    const { width, height } = imageBitmap;
    const context = new OffscreenCanvas(width, height).getContext(
        "2d",
    ) as OffscreenCanvasRenderingContext2D;
    context.drawImage(imageBitmap, 0, 0, width, height);
    return context.getImageData(0, 0, width, height);
});

const imageDataReadResults = await readBarcodesFromImageData(
    imageData,
    readerOptions,
);

console.log(imageDataReadResults[0].text); // Hello world!