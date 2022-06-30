import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { App } from "./main/m1-ui/app/App";
import { store } from "./main/m2-bll/store";
import reportWebVitals from "./reportWebVitals";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

reportWebVitals();

// ReactDOM.render(
//   <HashRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </HashRouter>,
//   document.getElementById("root")
// );
