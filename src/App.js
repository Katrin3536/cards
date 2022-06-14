import './App.css';
import Header from './main/m1-ui/header/Header'
import {HashRouter} from "react-router-dom";
import RoutesConstants from "./main/m1-ui/routes/RoutesConstants";

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
