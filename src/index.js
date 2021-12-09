import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { ToastContainer } from 'react-toastify'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
ReactDOM.render(
            <>
            <App />
            <ToastContainer />
            </>,
document.getElementById('root'))
