import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.scss";

import {store} from "./store";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Outlet />
    </div>
    </Provider>
  );
}

export default App;
