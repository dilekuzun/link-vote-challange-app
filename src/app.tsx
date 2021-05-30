import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar";
import Body from "./components/body";
import Footer from "./components/footer";
import './app.scss';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar/>
                <hr/>
                <Body/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
