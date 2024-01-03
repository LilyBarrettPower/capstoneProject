// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import SavedItemsCard from "../components/SavedItemsCard";
import { useUserContext } from '../context/userContext';
import useFetch from "../hooks/UseFetch";

// import the relavant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

function SavedItemsPage() {

    const currentUser = useUserContext();
    const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID, 10)}`;

    const { data: userSavedItems, error: errorSavedItems } = useFetch(userSavedItemsUrl);

    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
            <h1>Saved items page</h1>
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={6}>
                        <h3 className='headings' style={{ marginBottom: '55px' }}>Items you have saved:</h3>
                        {userSavedItems.length > 0 ? (
                            <SavedItemsCard savedItems={userSavedItems} />
                        ) : (
                            <div>No saved items</div>
                        )}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default SavedItemsPage;