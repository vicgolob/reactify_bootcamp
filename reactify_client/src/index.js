import React from 'react';
import ReactDOM from 'react-dom';
import { Route , BrowserRouter } from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import Artists from './components/Artists';
import Albums from './components/Albums';
import Songs from './components/Songs';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={Home}/>
            <Route path="/artists" component={Artists}/>
            <Route path="/albums" component={Albums}/>
            <Route path="/songs" component={Songs}/>
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
