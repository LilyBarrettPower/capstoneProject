import { useState, useEffect } from "react";
import { useLoginInput } from "../hooks/useLoginInput";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function LoginForm() {

    const navigate = useNavigate();
    const { handleUpdateUser } = useUserContext(); //accessing the user context

    const [status, setStatus] = useState('');
    // const [usersData, setUsersData] = useState([]);

    const [emailInputProps, resetEmail] = useLoginInput('Example@gmail.com');
    const [passwordInputProps, resetPassword] = useLoginInput('*******');

    const handleLogin = async (e) => {
        e.preventDefault();
        const enteredEmail = emailInputProps.value;
        const enteredPassword = passwordInputProps.value;

        try {
            const response = await fetch('http://localhost:3307/rentshare/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: enteredEmail,
                    Password: enteredPassword,
                }),
            })

            console.log('Response status:', response.status)

            if (!response.ok) {
                throw new Error('Login failed, please check credentials');

            }
            
            const data = await response.json();
            console.log('Data from server', data)
            resetEmail();
            resetPassword();
            setStatus('success')

            handleUpdateUser({
                UserID: data.user.UserID || '',
                Email: data.user.Email || '',
                UserName: data.user.UserName || '',
                FullName: data.user.FullName || '',
                Contact: data.user.Contact || '',
                Location: data.user.Location || ''

                // need to add profile picture here!
            });

            navigate('/ProfilePage');
        } catch (error) {
            setStatus(error.message);
        }
    } 
    
    function handleSignup() {
        navigate('/SignupPage');
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-3">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="headings">Email:</Form.Label>
                    <Form.Control type="email" value={emailInputProps.value} onChange={emailInputProps.onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="headings">Password:</Form.Label>
                    <Form.Control type="password" value={passwordInputProps.value} onChange={passwordInputProps.onChange} />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleLogin} className="my-3 body">Login!</Button>
                </div>
                {status && <Alert variant={status === 'success!' ? 'success' : 'danger'} className="mt-3">
                    {status}
                    </Alert>}
                <p className='body d-flex justify-content-center'>Don't have an account?</p>
                <div className='d-flex justify-content-center'>
                    <Button variant='secondary' onClick={handleSignup} className='my-3 body'>Sign up!</Button>
                </div>
            </Form>
        </Container>

    );
}

export default LoginForm;