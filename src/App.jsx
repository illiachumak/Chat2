import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './Pages/Chat'
import RegisterPage from './Pages/Register'
import LoginPage from './Pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from  'react-bootstrap' 
import NavBar from './Components/NavBar'
import { useSelector } from 'react-redux'

function App() {

  const user = localStorage.getItem('user')
  const { needUpdate } = useSelector(state => state.login)
 
  
  return (
    <>
    <NavBar/>
      <Container>
        <Routes>
          <Route path='/' element={user ?<ChatPage/> : <Navigate to='/login' />} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/login' element={user ?<ChatPage/> : <LoginPage/>} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
