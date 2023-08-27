import { useId, useState,} from 'react';
import { Alert, Button, Form, Row, Col, Stack, Spinner} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/registerSlice';
import useFormValidation from '../hooks/formValidation';

const RegisterPage = () => {

    const {isLoading} = useSelector(state => state.register);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState('')
    const [serverAlert, setServerAlert] = useState('')
    

    const handleSubmitReg = async (e) => {
        e.preventDefault()
        const formError = useFormValidation(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value)
        setValidationError(formError)
        if (validationError) return
        else {
            try{
            await dispatch(registerUser({
              name: e.target[0].value,
              email: e.target[1].value,
              password: e.target[2].value,
            })).unwrap()
            alert('User created!')
            navigate('/login'); 
        } catch (e) {
            setServerAlert(e)
        }
    }
      }
      

    const formId = useId();
    
    return ( 
    <>
        <Form id={formId} onSubmit={handleSubmitReg}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%"
                }}>

            <Col xs={6}>
            <Stack gap={3}>
                    <h2>Register</h2>
                    <Form.Control type='text' placeholder='Name'/>
                    <Form.Control type='email' placeholder='Email'/>
                    <Form.Control type='password' placeholder='Password'/>
                    <Form.Control type='password' placeholder='Confirm password'/>  
                    {isLoading ? 
                    <Button variant='primary' type='submit' disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                    :<Button variant='primary' type='submit'>Register
                    </Button>
                    }
                    <Link to='/login' style={{
                        textAlign: "center",
                        margin: "0 auto",
                        padding: "0 7px"
                    }}><h6>Already have an account? Login</h6></Link>
                    {validationError && <Alert variant='danger'>{validationError}</Alert>}
                    {serverAlert && <Alert variant='danger'>{serverAlert}</Alert>}   
            </Stack>
            </Col>
            </Row>
        </Form>  
    </> 
    );
}
 
export default RegisterPage;