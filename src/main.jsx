import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {FirebaseContext} from './store/context.jsx'
import Context from './store/context.jsx'
import firebase  from './firebase/config.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{firebase}}>
      <BrowserRouter>
      <Context>
      <App/>
      </Context>
    </BrowserRouter>
    </FirebaseContext.Provider>
  </StrictMode>
)
