import { useState } from 'react';
import Button from "react-bootstrap/Button";

import HireItemModal from './HireItemModal';

function HireItemButton() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant='secondary' className='body' onClick={handleShow}>
                Hire Item
            </Button>
            <HireItemModal show={showModal} handleClose={() => setShowModal(false)}></HireItemModal>
        </>
    )
}

export default HireItemButton;