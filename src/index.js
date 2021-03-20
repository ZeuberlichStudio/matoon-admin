import React from 'react';
import App from './app';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

render( <BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
