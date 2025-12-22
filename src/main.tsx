import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DevToolsProvider } from './components/DevTools';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <DevToolsProvider>
                <App />
            </DevToolsProvider>
        </BrowserRouter>
    </React.StrictMode>
);
