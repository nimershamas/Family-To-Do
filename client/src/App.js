import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from "./components/signIn/SignIn"
import {Route,Switch} from "react-router-dom";
import Register from "./components/register/Register"
import Card from "./components/cards/Card"
import MainPage from "./components/homePage/homePage"
function App() {
  return (
    <div className="App">
        <Switch>
        <Route path="/MainPage" component={MainPage}/>
        <Route path="/card" component={Card}/>
        <Route path="/SignUp" component={Register}/>
        <Route path="/" component={SignIn}/>
        </Switch>
    </div>
  );
}

export default App;
