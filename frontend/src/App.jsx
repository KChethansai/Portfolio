import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router'
import Preloader from '../components/Preloader'
import Home from '../components/Home'
import About from '../components/About'

function App() {
  const reactobj=createBrowserRouter([
    {
      path:'/',
      element:<Preloader/>
    },
    {
      path:'/home',
      element:<Home/>
    }
    ,{
      path:'/about',
      element:<About/>
    }
  ])
  return (
    <div>
      <RouterProvider router={reactobj}/>
    </div>
  )
}

export default App



