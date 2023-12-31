
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
        const { name, files } = e.target;

        // Check if files are present before updating state
        if (files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();

            // Append all form data
            for (const key in formData) {
                if (Array.isArray(formData[key])) {
                    for (let i = 0; i < formData[key].length; i++) {
                        formDataToSend.append(`${key}[${i}]`, formData[key][i]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append UserID separately
            formDataToSend.append('UserID', currentUser.UserID.toString());

            const response = await fetch('http://localhost:3307/rentshare/items/create', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Item registered successfully', result);

                // create a pop up to alert user their item has been created:
                alert('Item registered successfully');

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
                            <option value='Clothing'>Clothing</option>
                            <option value='Jewellery'>Jewellery</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Homeware'>Homeware</option>
                            <option value='SportingGoods'>Sporting goods</option>
                            <option value='PetSupplies'>Pet supplies</option>
                            <option value='Machinery'>Machinery</option>
                            <option value='FarmingEquipment'>Farming equipment</option>
                            <option value='HomeImprovement'>Home improvement</option>
                            <option value='Miscellaneous'>Miscellaneous</option>
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
                            <option value='Auckland'>Auckland</option>
                            <option value='Northland'>Northland</option>
                            <option value='Marlborough'>Marlborough</option>
                            <option value='Wellington'>Wellington</option>
                            <option value='Canterbury'>Canterbury</option>
                            <option value='Otago'>Otago</option>
                            <option value='Southland'>Southland</option>
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
                        <Form.Control type="file" name="ItemFeaturedPhoto" accept='image/*' onChange={handleFileChange} className='body' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='headings'>Other Photos:</Form.Label>
                        <Form.Control type='file' name='ItemOtherPhotos' accept='image/*' multiple onChange={handleFileChange} className='body'/>
                    </Form.Group>

                    <Button variant='secondary' type='submit' className='body mt-2'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default CreatePostModal;