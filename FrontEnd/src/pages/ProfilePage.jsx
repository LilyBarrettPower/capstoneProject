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

    // const { data: userItems, error: errorItems } = useFetch(userItemsUrl);


    const [errorBookedItems, setErrorBookedItems] = useState(null);
    const [userBookedItems, setUserBookedItems] = useState([]);

    const [errorRentedItems, setErrorRentedItems] = useState(null);
    const [userItems, setUserItems] = useState([]);

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



    // testing for the fetch for rented items:

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(userItemsUrl);
                const result = await response.json();
                if (response.ok) {
                    setUserItems(result.data);
                } else {
                    setErrorRentedItems(result.error);
                }
            } catch (error) {
                setErrorRentedItems(error.message);
            }
        };
        fetchData();
    }, [userItemsUrl]);


    const handleDeleteListing = async (itemID) => {
        try {
            const response = await fetch(`http://localhost:3307/rentshare/items/${itemID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Listing deleted successfully')
                alert('Listing removed!')
                setUserItems((prevUserItems) => prevUserItems.filter((item) => item.ItemID !== itemID)
                );
            } else {
                console.error('Error deleting listing', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting listing', error.message)
        }
    };



    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; 
    }







    return (
        <div>
            <Header />
            <NavBar />
            <LogOutButton />
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={2}>
                        <CreatePostButton />
                        <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={5}>
                                {userItems.length > 0 ? (
                                    userItems.map((item) => (
                                        <RentedItemCard key={item.ItemID} itemData={item} onDeleteListing={handleDeleteListing} />
                                    ))
                                ) : (
                                    <div>No current items for rent</div>
                                )}
                            </Col>
                            {/* render the booked items here  */}
                            <Col md={5}>
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
        </div>
    );
}

export default ProfilePage;