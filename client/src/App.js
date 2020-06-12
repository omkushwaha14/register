import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

const App = () => (
    <BrowserRouter>
    <Switch>
      <MainRouter />
    </Switch>
    </BrowserRouter>
);

export default App;
