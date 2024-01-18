// import the relevant components:
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LogOutButton from '../components/LogOutButton';
import RentedItemCard from '../components/RentedItemCard';
import useFetch from '../hooks/useFetch';
import BookedItemCard from '../components/BookedItemCard';

// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext'
import { useState, useEffect } from 'react';

import '../styling/Page.css';


function ProfilePage() {
    // get the current user from the context
    const currentUser = useUserContext();
    // set the url's for fetches
    const userItemsUrl = `http://localhost:3307/rentshare/items/getrented/${parseInt(currentUser.currentUser.UserID, 10)}`;
    const bookedItemsUrl = `http://localhost:3307/rentshare/bookings/getbooked/${parseInt(currentUser.currentUser.UserID, 10)}`;
    // create states for booked items
    const [errorBookedItems, setErrorBookedItems] = useState(null);
    const [userBookedItems, setUserBookedItems] = useState([]);
    // create states for rented items
    const [errorRentedItems, setErrorRentedItems] = useState(null);
    const [userItems, setUserItems] = useState([]);
    // yseEffect to fetch the booked items data based on the current user
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
            // use the API to delete a booking based on the booking ID
            const response = await fetch(`http://localhost:3307/rentshare/bookings/${bookingID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Booking deleted successfully!');
                console.log('Before update:', userBookedItems); // testing
                alert('Booking removed!')
                // update the UI
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
    // useEffect to fetch the items a user has created based on the current user
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
            // use the API to delete a listing that the current user created based on the itemID
            const response = await fetch(`http://localhost:3307/rentshare/items/${itemID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Listing deleted successfully')
                alert('Listing removed!')
                // update the UI
                setUserItems((prevUserItems) => prevUserItems.filter((item) => item.ItemID !== itemID)
                );
            } else {
                console.error('Error deleting listing', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting listing', error.message)
        }
    };

    // create a handlecreateitem function to update the Ui when an item is created:
    const handleCreateItem = async () => {
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

    // if theres no current user then show a message
    if (!currentUser.currentUser.UserID) {
        return <div className='headings'>No user logged in</div>; 
    }
    return (
        <div>
            <Header />
            <NavBar />
            <LogOutButton />
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={2} className='profileInfoCard'>
                        <CreatePostButton onCreateItem={handleCreateItem} />
                        <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={5} className='CardContainer'>
                                <h3 className='headings italic mt-3 mb-2'>Your listings:</h3>
                                {userItems.length > 0 ? (
                                    userItems.map((item) => (
                                        <RentedItemCard key={item.ItemID} itemData={item} onDeleteListing={handleDeleteListing} />
                                    ))
                                ) : (
                                    <div className='body'>No current items for rent</div>
                                )}
                            </Col>
                            {/* render the booked items here  */}
                            <Col md={5} className='CardContainer'>
                                <h3 className='headings italic mt-3 mb-2'>Your bookings:</h3>
                                {userBookedItems.length > 0 ? (
                                    <BookedItemCard
                                        bookedItems={userBookedItems}
                                        onDeleteBooking={handleDeleteBooking}
                                        // userBookedItems={userBookedItems}
                                        setUserBookedItems={setUserBookedItems}
                                    />
                                ) : (
                                    <div className='body'>No booked items</div>
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