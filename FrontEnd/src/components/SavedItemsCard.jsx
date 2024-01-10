import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useUserContext } from '../context/userContext';
import UnSaveItemButton from './UnSaveItemButton';
import HireItemButton from './HireItemButton';

const SavedItemsCard = ({ savedItems, onUnSave }) => {

    console.log(onUnSave); 

    const { currentUser } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 


    const handleShowModal = (itemData) => {
        setSelectedItem(itemData);
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);



 


    return (
        <>
            {savedItems.map((savedItem) => (
                <Card key={savedItem.SavedItemID} style={{ width: '100%', margin: '10px' }} className="mb-3">
                    <div className="d-flex">
                        <div style={{ float: 'left', width: '70%' }}>
                            <Card.Body>
                                <Card.Title className="headings">{savedItem.item.ItemName || 'No Name'}</Card.Title>
                                <Card.Text className="body">{savedItem.item.ItemFeaturedDescription || 'No Description'}</Card.Text>
                                <Card.Text className="body">${savedItem.item.ItemPricePerDay ? `${savedItem.item.ItemPricePerDay} Per Day` : 'No Price'}</Card.Text>
                            </Card.Body>
                        </div>
                        <div style={{ float: 'right', width: '30%', display: 'flex', justifyContent: 'center' }}>
                            <Card.Img
                                src={savedItem.item.ItemFeaturedPhoto}
                                alt={savedItem.item.ItemName}
                                style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', margin: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="mt-1 mb-3 mx-2">
                        <Button variant="secondary" className='body mx-2 mt-2' onClick={() => handleShowModal(savedItem)}>
                            Read more
                        </Button>
                        <UnSaveItemButton savedItemID={savedItem.SavedItemID} UnSave={onUnSave} />
                        <HireItemButton itemID={savedItem.item.ItemID} ownerID={savedItem.item.OwnerID} />
                    </div>
                </Card>
            ))}

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
                                        {Array.isArray(selectedItem.item.ItemOtherPhotos) && selectedItem.item.ItemOtherPhotos.length > 0 ? (
                                            selectedItem.item.ItemOtherPhotos.map((photo, photoIndex) => (
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
                                    {/* This is where I will put "message user" button */}
                        </div>
                    </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
};

export default SavedItemsCard;