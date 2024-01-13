import { useState } from 'react';
import Button from "react-bootstrap/Button";
import CreatePostModal from './CreatePostModal';


function CreatePostButton() {
    // state for showing modal
    const [showModal, setShowModal] = useState(false);

    // function to show modal
    const handleShow = () => setShowModal(true);


    return (
        <>
            <Button variant='secondary' className='body mt-3 mb-2' onClick={handleShow}>
                {/* when button is clicked, handleShow is called */}
                Create Post
            </Button>
            {/* render the modal: */}
                <CreatePostModal show={showModal} handleClose={() => setShowModal(false)}></CreatePostModal>
        </>
    )
}

export default CreatePostButton; 