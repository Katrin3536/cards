import './App.css';
import Header from '../header/Header'
import {HashRouter} from "react-router-dom";
import RoutesConstants from "../routes/RoutesConstants";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <RoutesConstants/>
                {/*<Main/>*/}
            </HashRouter>
        </div>
    );
}

export default App;
