// import bootstrap components
import Button from "react-bootstrap/esm/Button";
// import custom styling 
import '../styling/logOutButton.css';
// import extras:
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
    const { logOut } = useUserContext();
    const navigate = useNavigate();

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