import FileReader from "./components/QrFileReader/QrFileReader.tsx";
import Results from "./components/Results/Results.tsx";
import {Toaster} from "react-hot-toast";
import QrFileReaderStore from "./components/QrFileReader/QrFileReader.store.ts";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    return (
        <>
            <div className={"wrapper"}>
                <h1 className={"title"}>Сканер QR кодов</h1>
                <div className="workspace">
                    <div className="workspace__item">
                        {/*<Button text={"Предоставить доступ к камере"} icon={<Camera/>}/>*/}
                    </div>
                    <div className="workspace__item workspace__item_dashed"
                         onDragEnter={QrFileReaderStore.handleDrag.bind(QrFileReaderStore)}
                         onDragLeave={QrFileReaderStore.handleDrag.bind(QrFileReaderStore)}
                         onDragOver={QrFileReaderStore.handleDrag.bind(QrFileReaderStore)}
                         onDrop={QrFileReaderStore.handleDrop.bind(QrFileReaderStore)}
                    >
                        <FileReader/>
                        <div className={`drag-area ${QrFileReaderStore.dragIsActive ? "active" : ""}`}>+</div>
                    </div>
                </div>
                <Results/>
                <Toaster position={"bottom-center"}/>
            </div>
        </>
    )
})

export default App
