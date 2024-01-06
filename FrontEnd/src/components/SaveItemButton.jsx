
import React from 'react';
import Button from 'react-bootstrap/Button';

const SaveItemButton = ({ itemID, onSave }) => {
    const handleSave = () => {
        // Call the onSave function with the itemID
        onSave(itemID);
    };

    return (
        <Button variant="secondary" onClick={handleSave} style={{marginLeft: '10px'}} className='body mt-2'>
            Save Item
        </Button>
    );
};

export default SaveItemButton;