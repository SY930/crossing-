import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/scss/index.scss';
import App from './pages/App';
import SymboDetail from './pages/detail';


ReactDOM.render(
    <Router>
        <App>
            <Switch>
                {/* <Route exact path={'/'} component={SymboDetail} /> */}
                <Route exact path={'/!algoorder6'} component={SymboDetail} />
            </Switch>
        </App>
    </Router>, document.getElementById('root'));


