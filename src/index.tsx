import React from "react";
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import configureCrrStore from "./store/curr-store";
import configureSettingStore from "./store/setting-store";
import configureWalletStore from "./store/wallet-store";
import { Provider } from "react-redux";
import { store } from "./state";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

configureCrrStore();
configureSettingStore();
configureWalletStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
