import { useState } from 'react';
import Button from "react-bootstrap/Button";
import CreatePostModal from './CreatePostModal';


function CreatePostButton() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    // const handleClose = () => setShowModal(false);

    return (
        <>
            <Button variant='secondary' className='body' onClick={handleShow}>
                Create Post
            </Button>
            <CreatePostModal show={showModal} handleClose={() => setShowModal(false)}></CreatePostModal>
        </>
    )
}

export default CreatePostButton; 