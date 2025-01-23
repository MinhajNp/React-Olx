import React, {useEffect, useContext} from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext, FirebaseContext } from './store/context'
import Create from './pages/Create'
import View from './components/View/View'
import ViewPost from './pages/ViewPost'
import Post from './store/PostContext'
import Error from './pages/Error'

function App() {
  const {setUser}=useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <ToastContainer />
      <Post>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<ViewPost/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      </Post>
    </div>
  )
}

export default App