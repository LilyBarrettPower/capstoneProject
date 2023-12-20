import { useState, useEffect } from "react";
import { useLoginInput } from "../hooks/useLoginInput";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function LoginForm() {
    const [status, setStatus] = useState('');
    const [usersData, setUsersData] = useState([]);

    const [emailInputProps, resetEmail] = useLoginInput('Example@gmail.com');
    const [passwordInputProps, resetPassword] = useLoginInput('*******');

                                    // useEffect(() => {
                                    //     fetch('./database/users.json')
                                    //         .then(response => response.json())
                                    //         .then(data => setUsersData(data))
                                    //         .catch(error => console.error("Error fetching the users data:", error));
                                    // }, []);

    function handleLogin() {
        const enteredEmail = emailInputProps.value;
        const enteredPassword = passwordInputProps.value;

        const user = usersData.find(user => user.email === enteredEmail && user.password === enteredPassword);

        if (user) {
            resetEmail();
            resetPassword();
            setStatus('success!');
            // Navigate or handle context update here if needed
        } else {
            setStatus('Login failed. Please check credentials.');
        }
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
                <Button variant="secondary" onClick={handleLogin} className="my-3 body">Login!</Button>
                {status && <Alert variant={status === 'success!' ? 'success' : 'danger'} className="mt-3">
                    {status}
                </Alert>}
            </Form>
        </Container>
    );
}

export default LoginForm;