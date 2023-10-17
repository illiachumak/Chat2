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
          <Route path='/Chat2' element={user ?<ChatPage/> : <Navigate to='/Chat2/login' />} />
          <Route path='/Chat2/register' element={<RegisterPage/>} />
          <Route path='/Chat2/login' element={user ?<ChatPage/> : <LoginPage/>} />
          <Route path='*' element={<Navigate to='/Chat2/'/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
