import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './App'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
