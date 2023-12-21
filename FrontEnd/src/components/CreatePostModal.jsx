import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreatePostModal({show, handleClose}) {
    const [formData, setFormData] = useState({
        ItemCategory: '',
        ItemName: '',
        ItemDescription: '',
        ItemPricePerDay: '',
        ItemLocation: '',
        Available: '',
        ItemPhotos: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData((prevData) => ({ ...prevData, ItemPhotos: files }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data: ', formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headings'>Create a post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="ItemCategory">
                        <Form.Label className='headings'>Category:</Form.Label>
                        <Form.Control as='select' name='ItemCategory' value={formData.ItemCategory} onChange={handleInputChange}>
                            <option value=''>Select category:</option>
                            <option value='category1'>Category 1</option>
                            <option value='category2'>Category 2</option>
                            {/* Change these options to the categories i want! */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ItemName'>
                        <Form.Label className='headings'>Item name:</Form.Label>
                        <Form.Control type='text' name='ItemName' value={formData.ItemName} onChange={handleInputChange}/> 
                    </Form.Group>
                    <Form.Group controlId='ItemDescription'>
                        <Form.Label className='headings'>Item Description:</Form.Label>
                        <Form.Control as='textarea' rows={3} name='ItemDescription' value={FormData.ItemDescription} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId='ItemLocation'>
                        <Form.Label className='headings'>Item location:</Form.Label>
                        <Form.Control as='select' name='ItemLocation' value={formData.ItemLocation} onChange={handleInputChange}>
                            <option value=''>Select your location:</option>
                            <option value='location1'>Location 1</option>
                            <option value='location2'>Location 2</option>
                            {/* change these location options to the locations you want  */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ItemPricePerDay'>
                        <Form.Label className='headings'>Item Price Per Day:</Form.Label>
                        <Form.Control type='text' name='ItemPricePerDay' value={formData.ItemPricePerDay} onChange={handleInputChange}/>
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Available days:</Form.Label>
                        
                    </Form.Group> */}
                    {/* Need to figure out how to change this to include a calander integration.... */}
                    <Form.Group>
                        <Form.Label className='headings'>Item Photos:</Form.Label>
                        <Form.Control type='file' multiple name='ItemPhotos' onChange={handleFileChange}/>
                    </Form.Group>

                    <Button variant='secondary' type='submit' className='body mt-2'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default CreatePostModal;