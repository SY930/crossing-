import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './assets/scss/index.scss';
import App from './pages/App';
import SymboDetail from './pages/detail';


ReactDOM.render(
        <App>
            <SymboDetail></SymboDetail>
            {/* <Switch> */}
                {/* <Route exact path={'/'} component={SymboDetail} /> */}
                {/* <Route exact path={'!algoorder6'} component={SymboDetail} />
            </Switch> */}
        </App>, document.getElementById('root'));


