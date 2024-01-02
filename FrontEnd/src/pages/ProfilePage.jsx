// import the relevant components:
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
import RentedItemCard from '../components/RentedItemCard';
// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext';
import { useEffect, useState } from 'react';

// This is all currently for testing!
function ProfilePage() {

        // State to store the user's items
        const [userItems, setUserItems] = useState([]);

    const currentUser = useUserContext();
    console.log("currentUser", currentUser);
    //  const currentUserId = currentUser.UserID;
    // console.log("currentUserId", currentUserId);
    console.log(currentUser.currentUser.UserID);

    useEffect(() => {
        // Check if currentUserId is available and is a valid number
        if (currentUser.currentUser.UserID === undefined || isNaN(currentUser.currentUser.UserID)) {
            return;
        }

        // Fetch user items based on the current user's ID
        const fetchUserItems = async () => {
            try {
                const response = await fetch(`http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`);
                const data = await response.json();

                console.log('Response data:', data); // Log the response data

                if (response.ok) {
                    setUserItems(data.data);
                } else {
                    console.error('Error fetching user items:', data.error);
                }
            } catch (error) {
                console.error('Error fetching user items:', error);
            }
        };

        fetchUserItems();
    }, [currentUser.currentUser.UserID]);

    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
        <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px'}}>
            <Row>
                <Col md={2}> 
                    <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}> 
                        <h3 className='headings'>Items you have for rent:</h3>
                        <CreatePostButton /> 
                        {/* HERE WILL BE THE RENTED AND SAVED ITEMS RENDERED HERE! 
                        when you create a post I want it automatically added here, depedning on whos logged in  */}
                        {userItems.length > 0 ? (
                            userItems.map((item) => (
                                <RentedItemCard key={item.ItemID} itemData={item} />
                            ))
                        ) : (
                            <div>No current items for rent</div>
                        )}
                    </Col>
            </Row>
            </Container>

    </>
    );
}


export default ProfilePage;