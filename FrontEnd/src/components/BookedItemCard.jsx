import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useUserContext } from '../context/userContext';

const BookedItemCard = ({ bookedItems }) => {

    console.log('bookedItems:', bookedItems);


    // if (!bookedItems || !bookedItems.data) {
    //     return <div>No booked items</div>;
    // }


    const { currentUser } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleShowModal = (itemData) => {
        setSelectedItem(itemData);
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    console.log(bookedItems);

    return (
        <>
            {bookedItems.map((bookedItem) => (
                <Card key={bookedItem.BookingID} style={{ width: '100%', margin: '10px' }} className="mb-3">
                    <div className="d-flex">
                        <div style={{ float: 'left', width: '70%' }}>
                            <Card.Body>
                                <Card.Title className="headings">{bookedItem.item.ItemName || 'No Name'}</Card.Title>
                                <Card.Text className="body">{bookedItem.item.ItemFeaturedDescription || 'No Description'}</Card.Text>
                                <Card.Text className="body">${bookedItem.item.ItemPricePerDay ? `${bookedItem.item.ItemPricePerDay} Per Day` : 'No Price'}</Card.Text>
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
                        <Button variant="secondary" onClick={() => handleShowModal(bookedItem)}>
                            Read more
                        </Button>
                    </div>
                </Card>
            ))}

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                {selectedItem && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="headings">{selectedItem.item.ItemName}</Modal.Title>
                            <p className="body mt-4 mx-5">Category: {selectedItem.item.ItemCategory}</p>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="body">{selectedItem.item.ItemDescription}</p>
                                    <p className="body">{selectedItem.item.ItemPricePerDay}</p>
                                    <p className="body">{selectedItem.item.ItemLocation}</p>
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
                                                <p>No other photos available</p>
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
    )
}

export default BookedItemCard;