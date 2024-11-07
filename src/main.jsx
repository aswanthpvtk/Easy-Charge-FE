import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './components/store/index.jsx';
axios.defaults.baseURL = "https://easy-charge-be-7.onrender.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    
    </BrowserRouter>
    
  </StrictMode>,
)
