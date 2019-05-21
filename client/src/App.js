import React from "react";
import "./App.css";
import MainPage from "./MainPage";
import Episode8Summary from "./Episode8Summary";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={MainPage} />
        <Route path="/s8e5-summary" component={Episode8Summary} />
      </div>
    </Router>
  );
}

export default App;
