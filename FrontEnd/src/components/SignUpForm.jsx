// import all the Bootstrap components:
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import all the neccessary components:
import useSignUpInput from "../hooks/useSignUpInput";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const initialFormData = {
        FullName: "",
        UserName: "",
        Email: "",
        Contact: "",
        Location: "",
        Password: "",
        // Added new field for profile picture:
        ProfilePhoto: null,
    };

    const { handleUpdateUser } = useUserContext();
    const navigate = useNavigate();

    const {
        formData,
        handleInputChange,
        handleLocationChange,
        handleFileChange,
        resetForm
    } = useSignUpInput(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form data:", formData);
        // console.log for testing purposes

    const formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }
        

        try {
            // console.log for testing:
            // console.log('Request URL:', 'http://localhost:3307/rentshare/users/register');
            const response = await fetch('http://localhost:3307/rentshare/users/register', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: formDataToSend,  //JSON.stringify(formData),
            });

            const data = await response.json();

            // console.log('after fetch', response)
            if (response.ok) {
                // const result = await response.json();
                console.log('user registered successfully:', data);

                // after successful registration, log user in
                const loginResponse = await fetch('http://localhost:3307/rentshare/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Email: formData.Email,
                        Password: formData.Password,
                    }),
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();

                    if (loginData.message === 'User successfully logged in' && loginData.user) {
                        const loggedInUser = loginData.user;
                        handleUpdateUser(loggedInUser);
                        resetForm();
                        navigate('/ProfilePage');
                    }
                } else {
                    const errorResult = await loginResponse.json();
                    console.error('error during login after registration', errorResult.error);
                }
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
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group controlId="formFullName">
                    <Form.Label className="headings">Full name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="FullName"
                        className='body'
                        value={formData.FullName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label className="headings">Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="UserName"
                        className='body'
                        value={formData.UserName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label className="headings">Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="Email"
                        className='body'
                        value={formData.Email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formContact">
                    <Form.Label className="headings">Contact</Form.Label>
                    <Form.Control
                        type="text"
                        name="Contact"
                        className='body'
                        value={formData.Contact}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label className="headings">Location:</Form.Label>
                    <Form.Control
                        as="select"
                        name="Location"
                        className='body'
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
                    <Form.Label className="headings">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="Password"
                        className='body'
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProfilePhoto">
                    <Form.Label className="headings">Profile Photo:</Form.Label>
                    <Form.Control 
                        type="file"
                        accept="image/*"
                        className='body'
                        onChange={handleFileChange} 
                    />
                </Form.Group>
                <Button variant="secondary" type="submit" className="my-3 body">Sign up</Button>
            </Form>
        </Container>
    )
}

export default SignUpForm;