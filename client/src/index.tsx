import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';
import './main.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App/>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  </BrowserRouter>
);