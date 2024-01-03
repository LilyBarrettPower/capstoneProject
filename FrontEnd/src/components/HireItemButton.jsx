import { useState } from 'react';
import Button from "react-bootstrap/Button";

import HireItemModal from './HireItemModal';

function HireItemButton({itemID, ownerID}) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant='secondary' className='body' onClick={handleShow}>
                Hire Item
            </Button>
            <HireItemModal show={showModal} handleClose={() => setShowModal(false)} itemID={itemID} ownerID={ownerID}></HireItemModal>
        </>
    )
}

export default HireItemButton;