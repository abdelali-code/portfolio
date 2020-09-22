import React from 'react';
import Main from "./components/Main";
import { cofigureStore } from "./redux/store";
import './App.less';
import 'react-toastify/dist/ReactToastify.css';
// import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import history from "./shared/history";
import { Router } from "react-router-dom";
const store = cofigureStore();



store.subscribe(() => console.log("current state has changed", store.getState())
);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Main />
      </Router>

    </Provider>

  );
}

export default App;
