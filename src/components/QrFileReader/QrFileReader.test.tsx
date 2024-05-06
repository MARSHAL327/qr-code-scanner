import {render} from '@testing-library/react';
import QrFileReader from "./QrFileReader";

describe('QrFileReader', () => {
    it("Выбор файла по кнопке", () => {
        render(<QrFileReader/>)
    })
})