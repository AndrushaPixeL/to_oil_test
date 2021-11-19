import React from 'react'
import ReactDOM from 'react-dom'
import { StoreContext } from 'redux-react-hook'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Provider store={store}>
        <App />
      </Provider>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
