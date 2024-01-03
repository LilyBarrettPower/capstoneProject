// import the relevant components:
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
import RentedItemCard from '../components/RentedItemCard';
import SavedItemsCard from '../components/SavedItemsCard';
import useFetch from '../hooks/UseFetch';

// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext'
import { useEffect, useState } from 'react';

// const useFetch = (url) => {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(url);
//                 const result = await response.json();

//                 if (response.ok) {
//                     setData(result.data);
//                 } else {
//                     setError(result.error);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return { data, error };
// };


function ProfilePage() {
    const currentUser = useUserContext();
    const userItemsUrl = `http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`;
    // const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID, 10)}`;

    const { data: userItems, error: errorItems } = useFetch(userItemsUrl);
    // const { data: userSavedItems, error: errorSavedItems } = useFetch(userSavedItemsUrl);

    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <>
            <Header />
            <NavBar />
            <LogOutButton />
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={2}>
                        <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={6}>
                                <h3 className='headings'>Items you have for rent:</h3>
                                <CreatePostButton />

                                {userItems.length > 0 ? (
                                    userItems.map((item) => (
                                        <RentedItemCard key={item.ItemID} itemData={item} />
                                    ))
                                ) : (
                                    <div>No current items for rent</div>
                                )}
                            </Col>
                            {/* <Col md={6}>
                                <h3 className='headings' style={{marginBottom: '55px'}}>Items you have saved:</h3>
                                {userSavedItems.length > 0 ? (
                                    <SavedItemsCard savedItems={userSavedItems} />
                                ) : (
                                    <div>No saved items</div>
                                )}
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfilePage;