import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

//Creation de l'object createBrowserRouter
const router = createBrowserRouter([
  { path:"/", element:<Dashboard/> },
  { path:"/connexion", element:<Connexion/> },
  { path:"/inscription", element:<Inscription/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient} >
    <React.StrictMode>
      <Toaster/>
    <RouterProvider router={router}/>

    </React.StrictMode>,

  </QueryClientProvider>
)
