import FileReader from "./components/QrFileReader/QrFileReader.tsx";
import Results from "./components/Results/Results.tsx";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div className={"wrapper"}>
            <h1 className={"title"}>Сканер QR кодов</h1>
            <div className="workspace">
                <div className="workspace__item">
                    {/*<Button text={"Предоставить доступ к камере"} icon={<Camera/>}/>*/}
                </div>
                <div className="workspace__item workspace__item_dashed">
                    <FileReader />
                </div>
            </div>
            <Results />
            <Toaster position={"bottom-center"} />
        </div>
    )
}

export default App
