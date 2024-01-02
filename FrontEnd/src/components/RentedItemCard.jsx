
import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useState } from 'react';
import { useUserContext } from '../context/userContext';





const RentedItemCard = ({ itemData }) => {
    
    // import the currentUser from the userContext
    const currentUser = useUserContext();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Card style={{ width: '100%', margin: '10px' }} className="mb-3">
                <div className="d-flex">
                    <div style={{ float: 'left', width: '70%' }}>
                        <Card.Body>
                            <Card.Title className="headings">{itemData.ItemName || 'No Name'}</Card.Title>
                            <Card.Text className="body">{itemData.ItemFeaturedDescription || 'No Description'}</Card.Text>
                            <Card.Text className="body">${itemData.ItemPricePerDay ? `${itemData.ItemPricePerDay} Per Day` : 'No Price'}</Card.Text>
                        </Card.Body>
                    </div>
                    <div style={{ float: 'right', width: '30%', display: 'flex', justifyContent: 'center' }}>
                        <Card.Img
                            src={itemData.ItemFeaturedPhoto}
                            alt={itemData.ItemName}
                            style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', margin: '10px' }}
                        />
                    </div>
                </div>
                <div className="mt-1 mb-3 mx-2">
                    <Button variant="secondary" onClick={handleShowModal}>Read more</Button>
                </div>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    {/* need to change the itemData to link to the database when created... */}
                    <Modal.Title className='headings'>{itemData.ItemName}</Modal.Title>
                    <p className='body mt-4 mx-5'>Category: {itemData.ItemCategory}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p className="body">{itemData.ItemDescription}</p>
                            <p className='body'>{itemData.ItemPricePerDay}</p>
                            <p className='body'>{itemData.ItemLocation}</p>
                        </div>
                        <div className='col-md-6'>
                            {/* This is where I will add the message user, hire item and save item buttons! */}
                            <Carousel className='w-100'>
                                <Carousel.Item>
                                    <img className='d-block w-100' src={itemData.ItemFeaturedPhoto} alt='Featured image' style={{ MaxWidth: '400px', maxHeight: '300px' }} />
                                </Carousel.Item>
                                {Array.isArray(itemData.ItemOtherPhotos) ? (
                                    itemData.ItemOtherPhotos.map((photo, photoIndex) => (
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
                                    JSON.parse(itemData.ItemOtherPhotos).map((photo, photoIndex) => (
                                        <Carousel.Item key={photoIndex}>
                                            <img
                                                className="d-block w-100"
                                                src={photo}
                                                alt={`Other item image ${photoIndex + 1}`}
                                                style={{ maxWidth: '400px', maxHeight: '300px' }}
                                            />
                                        </Carousel.Item>
                                    ))
                                )}
                            </Carousel>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
};

export default RentedItemCard;