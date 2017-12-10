import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import App from "./components/container/App";
import MyProfileContainer from "./components/container/MyProfileContainer";

export default (store, history) => {
    return(
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="myprofile" component={MyProfileContainer}/>
            </Route>
        </Router>
    )
}
