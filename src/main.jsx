import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { persistor, store } from './redux/store/store.js'
import { BrowserRouter } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
)
