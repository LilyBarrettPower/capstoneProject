import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import useSignUpInput from "../hooks/useSignUpInput";
// import all the neccessary things 

function SignUpForm() {
    const initialFormData = {
        fullname: "",
        username: "",
        email: "",
        phonenumber: "",
        location: "",
        password: "",
        profilephoto: null,
    };

    const {
        formData,
        handleFileChange,
        handleInputChange,
        handleLocationChange,
        resetForm
    } = useSignUpInput(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        // console.log for testing purposes 
        resetForm();
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                        value={formData.location}
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formProfilePhoto">
                    <Form.Label>Profile Photo:</Form.Label>
                    <Form.Control
                        type="file"
                        name="profilephoto"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Button variant="secondary" type="submit" className="my-3 body">Sign up</Button>
            </Form>
        </Container>
    )
}

export default SignUpForm;