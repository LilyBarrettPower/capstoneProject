// import the relevant components:
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
import RentedItemCard from '../components/RentedItemCard';
import useFetch from '../hooks/UseFetch';
import BookedItemCard from '../components/BookedItemCard';

// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext'
import { useState, useEffect } from 'react';


function ProfilePage() {


    const currentUser = useUserContext();
    const userItemsUrl = `http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`;
    const bookedItemsUrl = `http://localhost:3307/rentshare/bookings/getbooked/${parseInt(currentUser.currentUser.UserID, 10)}`;

    const { data: userItems, error: errorItems } = useFetch(userItemsUrl);


    const [errorBookedItems, setErrorBookedItems] = useState(null);
    const [userBookedItems, setUserBookedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(bookedItemsUrl);
                const result = await response.json();

                if (response.ok) {
                    setUserBookedItems(result.data);
                } else {
                    setErrorBookedItems(result.error);
                }
            } catch (error) {
                setErrorBookedItems(error.message);
            }
        };

        fetchData();
    }, [bookedItemsUrl]);

    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; 
    }


        const handleDeleteBooking = async (bookingID) => {
            try {
                const response = await fetch(`http://localhost:3307/rentshare/bookings/${bookingID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log('Booking deleted successfully!');
                    console.log('Before update:', userBookedItems);
                    alert('Booking removed!')
                    setUserBookedItems((prevBookedItems) =>
                        prevBookedItems.filter((item) => item.BookingID !== bookingID)
                    );
                    console.log('After update:', userBookedItems);
                } else {
                    console.error('Error deleting booking:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting booking:', error.message);
            }
        };





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
                            {/* render the booked items here  */}
                            <Col md={6}>
                                <h3 className='headings' style={{ marginBottom: '55px' }}>Items you have booked:</h3>
                        
                                {userBookedItems.length > 0 ? (
                                    <BookedItemCard
                                        bookedItems={userBookedItems}
                                        onDeleteBooking={handleDeleteBooking}
                                        // userBookedItems={userBookedItems}
                                        setUserBookedItems={setUserBookedItems}
                                    />
                                ) : (
                                    <div>No booked items</div>
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