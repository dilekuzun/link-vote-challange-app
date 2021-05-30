import React from "react";
import {headerChallange, headerLink, headerVote} from "../statics/termConstants";
import hbLogo from '../statics/icons/hepsiburada-logo.svg';
import './navbar.scss';

function Navbar(props: any) {

    return (
        <div className="app-header">
            <img src={hbLogo} className="app-logo" alt="logo"/>
            <span>
                <b>{headerLink}</b>
                <i>{headerVote} </i>
                <b>{headerChallange}</b>
            </span>
        </div>
    );
}

export default Navbar;
