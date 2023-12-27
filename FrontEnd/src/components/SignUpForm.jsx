import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import useSignUpInput from "../hooks/useSignUpInput";
// import all the neccessary things 

function SignUpForm() {
    const initialFormData = {
        FullName: "",
        UserName: "",
        Email: "",
        Contact: "",
        Location: "",
        Password: "",
    };

    const {
        formData,
        handleInputChange,
        handleLocationChange,
        resetForm
    } = useSignUpInput(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        // console.log for testing purposes 
        

        try {
            // const formDataToSend = new FormData();
            // for (const key in formData) {
            //     formDataToSend.append(key, formData[key]);
            // }

            // Make the HTTP request:
            // console.log('Request URL:', 'http://localhost:3307/rentshare/users/register');
            const response = await fetch('http://localhost:3307/rentshare/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // console.log('after fetch', response)
            if (response.ok) {
                // const result = await response.json();
                console.log('user registered successfully:', data);
                resetForm();
            } else {
                // const errorResult = await response.json();
                console.error('error during registration', data.error);
                console.error('details', data)
            }
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="UserName"
                        value={formData.UserName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        type="text"
                        name="Contact"
                        value={formData.Contact}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        as="select"
                        name="Location"
                        value={formData.Location}
                        onChange={handleLocationChange}
                    >
                        <option value=" ">Select city:</option>
                        <option value="Auckland">Auckland</option>
                        <option value="Northland">Northland</option>
                        <option value="Marlborough">Marlborough</option>
                        <option value="Wellington">Wellington</option>
                        <option value="Canterbury">Canterbury</option>
                        <option value="Otago">Otago</option>
                        <option value="Southland">Southland</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="secondary" type="submit" className="my-3 body">Sign up</Button>
            </Form>
        </Container>
    )
}

export default SignUpForm;