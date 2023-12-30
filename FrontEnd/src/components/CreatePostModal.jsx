
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useUserContext } from "../context/userContext";

function CreatePostModal({ show, handleClose }) {
    const { currentUser } = useUserContext();

    const initialFormData = {
        ItemCategory: '',
        ItemName: '',
        ItemDescription: '',
        ItemPricePerDay: '',
        ItemFeaturedDescription: '',
        ItemLocation: '',
        Availability: '',
        ItemFeaturedPhoto: '',
        ItemOtherPhotos: [],
        // May need to think about how to do this one better to get the carousel working...
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData((prevData) => ({ ...prevData, ItemOtherPhotos: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form data: ', formData); -- console.log for testing purposes 
        try {
            const formDataToSend = new FormData();

            for (const key in formData) {
                if (key === 'ItemOtherPhotos') {
                    for (let i = 0; i < formData[key].length; i++) {
                        formDataToSend.append(`${key}[${i}]`, formData[key][i]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            console.log('UserID in formData:', currentUser.UserID);
            formDataToSend.append('UserID', (currentUser.UserID.toString()));

            const response = await fetch('http://localhost:3307/rentshare/items/create', {
                method: 'POST',
                body: formDataToSend
                // May need to add more of a response here to get the new post to be seen...
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Item registered successfully', result);

                // create a pop up to alert user their item has been created:
                alert('Item registered successfully')

                // reset form data on successful creation:
                setFormData({
                    ItemCategory: '',
                    ItemName: '',
                    ItemDescription: '',
                    ItemPricePerDay: '',
                    ItemFeaturedDescription: '',
                    ItemLocation: '',
                    Availability: '',
                    ItemFeaturedPhoto: '',
                    ItemOtherPhotos: [],
                    UserID: currentUser.UserID,
                });
                handleClose();
            } else {
                const errorResult = await response.json();
                console.error('Error while registering item', errorResult.error);
                console.error('Details:', errorResult);
            }
        } catch (error) {
            console.error('Error registering item', error);
        }
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
                        <Form.Control as='textarea' rows={3} name='ItemDescription' value={formData.ItemDescription} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId='ItemFeaturedDescription'>
                        <Form.Label className='headings'>Featured description</Form.Label>
                        <Form.Control type='text' name='ItemFeaturedDescription' value={formData.ItemFeaturedDescription} onChange={handleInputChange} />
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
                        <Form.Label className="headings">Featured Photo:</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='headings'>Other Photos:</Form.Label>
                        <Form.Control type='file' multiple name='ItemOtherPhotos' accept="image/*" onChange={handleFileChange}/>
                    </Form.Group>

                    <Button variant='secondary' type='submit' className='body mt-2'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default CreatePostModal;