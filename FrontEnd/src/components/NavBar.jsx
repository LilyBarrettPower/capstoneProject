import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import '../styling/NavBar.css'


function NavBar() {

    return (
        <Navbar expand="lg" className="navBarContainer">
            {/* using the bootstrap Navbar component */}
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/ProfilePage" className="navbaritem body px-3">Home</NavLink>
                        {/* using NavLinks here, when using bootstrap Nav.Link the context was lost when navigation occurred */}
                        <NavLink to="/TimelinePage" className="navbaritem body px-3">Browse</NavLink>
                        <NavLink to="/MessagesPage" className="navbaritem body px-3">Messages</NavLink>
                        <NavLink to="/SavedItemsPage" className="navbaritem body px-3">Saved</NavLink>
                        <NavLink to="/NotificationsPage" className="navbaritem body px-3">Notifications</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;