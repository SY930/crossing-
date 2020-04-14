import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/scss/index.scss';
import App from './pages/App';
import Home from './pages/home';
import Chart2 from './pages/chart2';
import Chart3 from './pages/chart3';
import Chart4 from './pages/chart4';
import Chart11 from './pages/chart11';
import Chart12 from './pages/chart12';
import FromOpt from './pages/from';
import TableOpt from './pages/from/table/index';
import bPTable from './pages/from/table/bPTable';
import bQTable from './pages/from/table/bQTable';
import qBpsTable from './pages/from/table/qBpsTable';
import qBtcTable from './pages/from/table/qBtcTable';
import DownTable from './pages/from/table/downTable'
import ConfigTable from './pages/from/table/config';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/chart02'} component={Chart2} />
                <Route path={'/chart03'} component={Chart3} />
                <Route path={'/chart04'} component={Chart4} />
                <Route path={'/option05'} component={FromOpt} />
                <Route path={'/table06'} component={TableOpt} />
                <Route path={'/table07'} component={bPTable} />
                <Route path={'/table08'} component={bQTable} />
                <Route path={'/table09'} component={qBpsTable} />
                <Route path={'/table10'} component={qBtcTable} />
                <Route path={'/chart11'} component={Chart11} />
                <Route path={'/chart12'} component={Chart12} />
                <Route path={'/download13'} component={DownTable} />
                <Route path={'/config14'} component={ConfigTable} />
            </Switch>
        </App>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
