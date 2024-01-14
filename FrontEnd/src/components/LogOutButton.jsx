// import bootstrap components
import Button from "react-bootstrap/esm/Button";
// import custom styling 
import '../styling/logOutButton.css';
// import extras:
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
    // use the logOut function in the context
    const { logOut } = useUserContext();
    // use navigate so when a user logs out if navigates them back to the login page
    const navigate = useNavigate();
    // in handleLogout, call the logout function from the context and naviagte to login page
    const handleLogOut = () => {
        logOut();
        navigate('/LoginPage');
    };

    return (
        <Button variant='secondary' className='body logOutButton' onClick={handleLogOut}>
            Logout
        </Button>
    );
};

export default LogOutButton;