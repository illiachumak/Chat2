import { Navbar, Container, Nav, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNeedUpdate } from '../redux/slices/loginSlice';
import { useState } from 'react';
import Profile from './Profile';

const NavBar = () => {

    const [profile, setProfile] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const logoLink = user ? '/' : '/Chat2/login'
    
    const logoutUser = () => {
        localStorage.removeItem('user')
        dispatch(setNeedUpdate())
        navigate('/Chat2/login')
    }

    const switchProfile = () => {
        setProfile(prevState => !prevState)
    }



    return ( 
        <>
        <Navbar>
            {profile && <Profile onClose={switchProfile}/>}
            <Container className='p-2 navbar'>
                <Link to={logoLink} className='link-light'>Telegram Lite</Link>
            
            <Nav>
                <Stack direction='horizontal' gap={3}>
                    {user && (<><Link onClick={switchProfile} className='link-light'>Profile</Link>
                    <Link to='/Chat2/login' className='link-light' onClick={logoutUser}>Log out</Link></>
                    )}
                    {!user && <Link to='/Chat2/login' className='link-light'>Login</Link>}
                    
                </Stack>
                
            </Nav>
            
            </Container>
        </Navbar>
        </>
     );
}
 
export default NavBar;