import Card from 'react-bootstrap/Card';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { useState } from 'react';



const ItemCard = ({ itemData }) => { //Replace itemData with the correct name for the table in database when constructed

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
        <Card style={{ width: '50%', margin: '10px' }} className="mb-3">
            <div className="d-flex">
                <div style={{ float: 'left', width: '70%' }}>
                    <Card.Body>
                        <Card.Title className="headings">{itemData.ItemName}</Card.Title>
                        <Card.Text className="body">{itemData.ItemDescription}</Card.Text>
                        <Card.Text className="body">${itemData.ItemPricePerDay} Per Day</Card.Text>
                    </Card.Body>
                </div>
                <div style={{ float: 'right', width: '30%', display: 'flex', justifyContent: 'center' }}>
                    <Card.Img
                        src={itemData.ItemFeaturedImage}
                        alt={itemData.ItemName}
                        style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', margin: '10px' }}
                    />
                </div>
            </div>
            <div className="text-center mt-2">
                <Button variant="secondary" onClick={handleShowModal}>Read more</Button>
            </div>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    {/* need to change the itemData to link to the database when created... */}
                    <Modal.Title className='headings'>{itemData.ItemName}</Modal.Title>
                    <p className='body'>{itemData.ItemCategory}</p>
                </Modal.Header>
                <Modal.Body>
                    <p className="body">{itemData.ItemDescription}</p>
                    <p className='body'>{itemData.ItemPricePerDay}</p>
                </Modal.Body>
                <Modal.Footer>
                    <p className='body'>{itemData.ItemLocation}</p>
                    <Carousel className='w-50'>
                        <Carousel.Item>
                            <img className='d-block' src={itemData.ItemFeaturedImage} alt='Featured image' style={{ width: '250px', height:'175px' }} /> 
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='d-block' src={itemData.ItemSecondImage} alt='Second item image' style={{ width: '250px', height: '175px' }} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='d-block' src={itemData.ItemThirdImage} alt='third item image' style={{ width: '250px', height: '175px' }} />
                        </Carousel.Item>
                    </Carousel>
                </Modal.Footer>
        </Modal>
        </>
    );
};

export default ItemCard;