import './App.css';
import Header from '../header/Header'
import {HashRouter} from "react-router-dom";
import RoutesConstants from "../routes/RoutesConstants";
import {ErrorSnackbar} from '../../common/с4-errorSnackbar/ErrorSnackbar';

function App() {
    return (
        <div className="App">
            <ErrorSnackbar/>
            <HashRouter>
                <Header/>
                <RoutesConstants/>
            </HashRouter>
        </div>
    );
}

export default App;
