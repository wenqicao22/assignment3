import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "./App";
import Edit from './Edit';

export default function Parent(props) {

    return (
        <>
            <Router>
                <Route path='/' exact component={App} />
                <Route path='/:hash/edit' exact component={Edit} />
            </Router>
        </>
    )
}
