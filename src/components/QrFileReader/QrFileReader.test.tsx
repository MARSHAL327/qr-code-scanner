import {render, screen} from '@testing-library/react';
import QrFileReader from "./QrFileReader";

describe('QrFileReader', () => {
    it("Выбор файла по кнопке", () => {
        render(<QrFileReader/>)
        const testEl = screen.getByText(/или перетащите его в это поле/i)
        expect(testEl).toBeInTheDocument();
    })
})