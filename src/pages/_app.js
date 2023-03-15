import store from '@/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}
