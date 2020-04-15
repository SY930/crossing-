import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/scss/index.scss';
import App from './pages/App';
import Home from './pages/home';
import SymboDetail from './pages/detail';


ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/symbol/:id'} component={SymboDetail}></Route>
            </Switch>
        </App>
    </Router>, document.getElementById('root'));


