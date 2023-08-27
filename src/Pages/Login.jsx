import { useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { loginUser } from '../redux/slices/loginSlice';


const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email } = useSelector(state => state.register)

    const [validationError, setValidationError] = useState('')

    const [ login , setLogin ] = useState({
        email: ``,
        password: '',
    })

    useEffect(() => {
        if(email){
            setLogin({...login, email: email})
        }
    },[])

    const submitLogin = async (e) => {
        e.preventDefault()
        try{
            await dispatch(loginUser(login)).unwrap()
            navigate('/')
        } catch (error) {
            console.log(error)
            setValidationError(error)
        }
    }

    return ( 
    <>
        <Form onSubmit={submitLogin}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        <Form.Control type='email' placeholder='Email' value={login.email} onChange={e => setLogin({...login, email:e.target.value})} />
                        <Form.Control type='password' placeholder='Password' value={login.password} onChange={e => setLogin({...login, password:e.target.value})} /> 
                        <Button variant='primary' type='submit'>Login</Button>
                        <Link to='/register' style={{
                            textAlign: "center",
                            margin: "0 auto",
                            padding: "0 7px"
                        }}><h6>Do not have an account? Register</h6></Link>
                        { validationError && (<Alert variant='danger'>{`${validationError}`}</Alert>)  }
                    </Stack>
                </Col>
            </Row>
        </Form>  
    </> 
    );
}
 
export default LoginPage;