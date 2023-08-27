import { Navbar, Container, Nav, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNeedUpdate } from '../redux/slices/loginSlice';

const NavBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const logoLink = user ? '/' : '/login'
    
    const logoutUser = () => {
        localStorage.removeItem('user')
        dispatch(setNeedUpdate())
        navigate('/login')
    }



    return ( 
        <>
        <Navbar>
            <Container className='p-2 navbar'>
                <Link to={logoLink} className='link-light'><img src="" alt="Logo" /></Link>
            
            <Nav>
                <Stack direction='horizontal' gap={3}>
                    {user && (<><Link to='/profile' className='link-light'>Profile</Link>
                    <Link to='/login' className='link-light' onClick={logoutUser}>Log out</Link></>
                    )}
                    {!user && <Link to='/login' className='link-light'>Login</Link>}
                    
                </Stack>
                
            </Nav>
            
            </Container>
        </Navbar>
        </>
     );
}
 
export default NavBar;