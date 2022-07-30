import ReactDOM from 'react-dom/client'
import { App } from 'app'
import { reportWebVitals } from 'shared/lib'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root')!)
root.render(<App />)
reportWebVitals()
