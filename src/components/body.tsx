import React from "react";
import {Route, Switch} from "react-router-dom";
import ErrorComp from "./error/errorComp";
import VoteLinkAdd from "../pages/addNewPage/voteLinkAdd";
import VoteLinkMain from "../pages/mainPage/voteLinkMain";

function Body(props: any) {

    return (
        <div className="body">
            <Switch>
                <Route exact path="/main" component={VoteLinkMain} />
                <Route exact path="/add" component={VoteLinkAdd} />
                <Route exact path="/" component={VoteLinkMain} />
                <Route component={ErrorComp} />
            </Switch>
        </div>
    );
}

export default Body;
