// import the relevant components:
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
import RentedItemCard from '../components/RentedItemCard';
import SavedItemsCard from '../components/SavedItemsCard';
// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext';
// import { useEffect, useState } from 'react';


// function ProfilePage() {

//         // State to store the user's items
//     const [userItems, setUserItems] = useState([]);
//     // State to store the user's saved items
//     const [userSavedItems, setUserSavedItems] = useState([]);

//     const currentUser = useUserContext();
//     console.log("currentUser", currentUser);
//     //  const currentUserId = currentUser.UserID;
//     // console.log("currentUserId", currentUserId);
//     console.log(currentUser.currentUser.UserID);

//     useEffect(() => {
//         // Check if currentUserId is available and is a valid number
//         if (currentUser.currentUser.UserID === undefined || isNaN(currentUser.currentUser.UserID)) {
//             return;
//         }

//         // Fetch user items based on the current user's ID
//         const fetchUserItems = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`);
//                 const data = await response.json();

//                 console.log('Response data:', data); // Log the response data

//                 if (response.ok) {
//                     setUserItems(data.data);
//                 } else {
//                     console.error('Error fetching user items:', data.error);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user items:', error);
//             }
//         };
//         const fetchUserSavedItems = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3307/saveditems/getsaved/${parseInt(currentUser.currentUser.UserID, 10)}`);
//                 const data = await response.json();

//                 console.log('Response data (saved items):', data);

//                 if (response.ok) {
//                     setUserSavedItems(data.data);
//                 } else {
//                     console.error('Error fetching user saved items:', data.error);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user saved items:', error);
//             }
//         };

//         fetchUserItems();
//         fetchUserSavedItems();
//     }, [currentUser.currentUser.UserID]);

//     if (!currentUser.currentUser.UserID) {
//         return <div>Loading...</div>; // Or any loading indicator
//     }

// testing 
import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();

                if (response.ok) {
                    setData(result.data);
                } else {
                    setError(result.error);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};

// function ProfilePage() {
//     const currentUser = useUserContext();
//     const userItemsUrl = `http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`;
//     // const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaved/${parseInt(currentUser.currentUser.UserID, 10)}`;

//     // testing:
//     const userSavedItemsUrl = `http://localhost:3307/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID, 10)}`;

//     const { data: userItems, error: errorItems } = useFetch(userItemsUrl);
//     const { data: userSavedItems, error: errorSavedItems } = useFetch(userSavedItemsUrl);

//     if (!currentUser.currentUser.UserID) {
//         return <div>Loading...</div>; // Or any loading indicator
//     }

//     return (
//         <>
//             <Header></Header>
//             <NavBar></NavBar>
//             <LogOutButton></LogOutButton>
//         <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px'}}>
//             <Row>
//                 <Col md={2}> 
//                     <ProfileInfo currentUser={currentUser} />
//                     </Col>
//                     <Col md={10}> 
//                         <h3 className='headings'>Items you have for rent:</h3>
//                         <CreatePostButton /> 
//                         {/* HERE WILL BE THE RENTED AND SAVED ITEMS RENDERED HERE! 
//                         when you create a post I want it automatically added here, depedning on whos logged in  */}
//                         {userItems.length > 0 ? (
//                             userItems.map((item) => (
//                                 <RentedItemCard key={item.ItemID} itemData={item} />
//                             ))
//                         ) : (
//                             <div>No current items for rent</div>
//                         )}
//                         {userSavedItems.length > 0 ? (
//                             userSavedItems.map((item) => (
//                                 <SavedItemsCard key={item.ItemID} itemData={item} />
//                             ))
//                         ) : (
//                             <div>No saved items</div>
//                         )}
//                     </Col>
//             </Row>
//             </Container>

//     </>
//     );
// }


// export default ProfilePage;

function ProfilePage() {
    const currentUser = useUserContext();
    const userItemsUrl = `http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`;
    const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID, 10)}`;

    const { data: userItems, error: errorItems } = useFetch(userItemsUrl);
    const { data: userSavedItems, error: errorSavedItems } = useFetch(userSavedItemsUrl);

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
                            <Col md={6}>
                                <h3 className='headings' style={{marginBottom: '55px'}}>Items you have saved:</h3>
                                {userSavedItems.length > 0 ? (
                                    <SavedItemsCard savedItems={userSavedItems} />
                                ) : (
                                    <div>No saved items</div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfilePage;