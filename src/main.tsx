import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { router } from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />

)
