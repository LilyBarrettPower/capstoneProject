// import the relevant components:
import ItemCard from '../components/ItemCard';
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext';

// This is all currently for testing!
function ProfilePage() {

    // use the context custom hook:
    const currentUser = useUserContext();

    console.log(currentUser);
    // Testing item data before adding the database

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
        <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px'}}>
            <Row>
                <Col md={2}> {/* Adjust the column size based on your needs */}
                    <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}> {/* Adjust the column size based on your needs */}
                        <h3 className='headings'>For rent:</h3>
                        <CreatePostButton /> 
                        {/* HERE WILL BE THE RENTED AND SAVED ITEMS RENDERED HERE!  */}
    
                </Col>
            </Row>
            </Container>

    </>
    );
}


export default ProfilePage;