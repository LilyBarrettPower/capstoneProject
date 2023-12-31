import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useState } from 'react';

import SaveItemButton from './SaveItemButton';
import { useUserContext } from '../context/userContext';
import HireItemButton from './HireItemButton';

const ItemCard = ({ itemData }) => { 

    console.log('itemData:', itemData);
    
    const { currentUser } = useUserContext();
    const ownerID = itemData.UserID;

    console.log(currentUser.UserID);

        if (!itemData) {
            console.error('Item data is undefined or null.');
            return null; // Render nothing if itemData is not available
        }

        console.log('ItemName:', itemData.ItemName);
        console.log('ItemFeaturedDescription:', itemData.ItemFeaturedDescription);
        console.log('ItemPricePerDay:', itemData.ItemPricePerDay);


    
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSaveItem = async (itemID) => {
        try {
            const userID = currentUser.UserID;

            // Make API call to save the item
            const response = await fetch('http://localhost:3307/rentshare/saveditems/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: userID,
                    ItemID: itemID,
                }),
            });

            if (response.ok) {
                // Handle success
                console.log('Item saved successfully!');
                alert('Item Saved Successfully!')
            } else {
                // Handle error
                console.error('Error saving item:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving item:', error.message);
        }
    };


    return (
        <>
        <Card style={{ width: '50%', margin: '10px' }} className="mb-3">
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
                    <Button variant="secondary" onClick={handleShowModal} className='body mt-2'>Read more</Button>
                    <SaveItemButton itemID={itemData.ItemID} onSave={handleSaveItem} />
                    <HireItemButton itemID={itemData.ItemID} ownerID={ownerID} />
            </div>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='headings'>{itemData.ItemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p className='body'>{itemData.ItemCategory}</p>
                            <p className="body">{itemData.ItemDescription}</p>
                            <p className='body'>$ {itemData.ItemPricePerDay} per day hire</p>
                            <p className='body'>{itemData.ItemLocation}</p>
                        </div>
                        <div className='col-md-6'>
                        <Carousel className='w-100'>
                            <Carousel.Item>
                                    <img className='d-block w-100' src={itemData.ItemFeaturedPhoto} alt='Featured image' style={{ MaxWidth: '400px', maxHeight: '300px' }} />
                            </Carousel.Item>
                                {Array.isArray(JSON.parse(itemData.ItemOtherPhotos)) &&
                                    JSON.parse(itemData.ItemOtherPhotos).map((photo, photoIndex) => (
                                        <Carousel.Item key={photoIndex}>
                                            <img
                                                className="d-block w-100"
                                                src={photo}
                                                alt={`Other item image ${photoIndex + 1}`}
                                                style={{ maxWidth: '400px', maxHeight: '300px' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                            <SaveItemButton itemID={itemData.ItemID} onSave={handleSaveItem} />
                            <HireItemButton itemID={itemData.ItemID} ownerID={ownerID} />
                        </div>
                    </div>
                </Modal.Body>

        </Modal>
        </>
    );
};



export default ItemCard;