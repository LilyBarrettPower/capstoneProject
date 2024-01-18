// import everything required:
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useUserContext } from '../context/userContext';
import DeleteBookingButton from './DeleteBookingButton';
import { format } from 'date-fns';

const BookedItemCard = ({ bookedItems, onDeleteBooking, setUserBookedItems,}) => {

    console.log('bookedItems:', bookedItems); // testing

    const { currentUser } = useUserContext();
    // state to manage the visibility of the modal
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // adding this for getting the userdetails:
    const [userDetails, setUserDetails] = useState({});


    // Fetch the poster's username based on UserID
    useEffect(() => {
        const fetchUserDetails = async () => {
            for (const bookedItem of bookedItems) {
                if (bookedItem.item.UserID !== currentUser.UserID) {
                    try {
                        const response = await fetch(`http://localhost:3307/rentshare/users/${bookedItem.item.UserID}`);
                        const result = await response.json();
                        if (response.ok) {
                            setUserDetails((prevDetails) => ({
                                ...prevDetails,
                                [bookedItem.item.UserID]: result.data, // Store user details by UserID
                            }));
                        } else {
                            console.error('Error fetching user details:', result.error);
                        }
                    } catch (error) {
                        console.error('Error fetching user details:', error.message);
                    }
                }
            }
        };

        fetchUserDetails();
    }, [bookedItems, currentUser.UserID]);

// function to show modal with selected item data
    const handleShowModal = (itemData) => {
        setSelectedItem(itemData);
        setShowModal(true);
    };
    // function to close the modal
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            {/* map through booked items and dsiaply each as a card */}
            {bookedItems.map((bookedItem) => {
                const posterUsername = bookedItem.item.UserID === currentUser.UserID
                    ? currentUser.UserName
                    : userDetails[bookedItem.item.UserID]?.UserName || 'Unknown';
                
                return (
                    <Card key={bookedItem.BookingID} style={{ width: '100%' }} className="mb-3">
                        <div className="d-flex">
                            <div style={{ float: 'left', width: '70%' }}>
                                <Card.Body>
                                    <Card.Title className="headings">{bookedItem.item.ItemName || 'No Name'}</Card.Title>
                                    <Card.Text className='body'>Posted by: { posterUsername}</Card.Text>
                                    <Card.Text className="body">{bookedItem.item.ItemFeaturedDescription || 'No Description'}</Card.Text>
                                    <Card.Text className="body">${bookedItem.item.ItemPricePerDay ? `${bookedItem.item.ItemPricePerDay} Per Day` : 'No Price'}</Card.Text>
                                    <Card.Text className='body'>{format(new Date(bookedItem.StartDate), 'do MMM yyyy')} - {format(new Date(bookedItem.EndDate), 'do MMM yyyy')}</Card.Text>
                                </Card.Body>
                            </div>
                            <div style={{ float: 'right', width: '30%', display: 'flex', justifyContent: 'center' }}>
                                <Card.Img
                                    src={bookedItem.item.ItemFeaturedPhoto}
                                    alt={bookedItem.item.ItemName}
                                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', margin: '10px' }}
                                />
                            </div>
                        </div>
                        <div className="mt-1 mb-3 mx-2">
                            {/* display buttons */}
                            <Button variant="secondary" className='body' onClick={() => handleShowModal(bookedItem)}>
                                Read more
                            </Button>
                            <DeleteBookingButton
                                bookingID={bookedItem.BookingID}
                                onDeleteBooking={() => onDeleteBooking(bookedItem.BookingID)}
                                setUserBookedItems={setUserBookedItems}
                            >
                                Remove booking
                            </DeleteBookingButton>
                        </div>
                    </Card>
                );
            })}
            {/* display the modal for detailed information */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                {selectedItem && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="headings">{selectedItem.item.ItemName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="body">{selectedItem.item.ItemCategory}</p>
                                    <p className="body">{selectedItem.item.ItemDescription}</p>
                                    <p className="body">$ {selectedItem.item.ItemPricePerDay} per day hire</p>
                                    <p className="body">{selectedItem.item.ItemLocation}</p>
                                    <div className='mt-1 mb-2 mx1'>
                                        {/*UI to display the dates of hire: */}
                                        <p className='body'>Hire date: {format(new Date(selectedItem.StartDate), 'do MMM yyyy')} - {format(new Date(selectedItem.EndDate), 'do MMM yyyy')}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Carousel className="w-100">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={selectedItem.item.ItemFeaturedPhoto}
                                                alt="Featured image"
                                                style={{ maxWidth: '400px', maxHeight: '300px' }}
                                            />
                                        </Carousel.Item>
                                        {Array.isArray(JSON.parse(selectedItem.item.ItemOtherPhotos)) && JSON.parse(selectedItem.item.ItemOtherPhotos).length > 0 ? (
                                            JSON.parse(selectedItem.item.ItemOtherPhotos).map((photo, photoIndex) => (
                                                <Carousel.Item key={photoIndex}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={photo}
                                                        alt={`Other item image ${photoIndex + 1}`}
                                                        style={{ maxWidth: '400px', maxHeight: '300px' }}
                                                    />
                                                </Carousel.Item>
                                            ))
                                        ) : (
                                            <Carousel.Item>
                                                <p className='body'>No other photos available</p>
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
}

export default BookedItemCard;