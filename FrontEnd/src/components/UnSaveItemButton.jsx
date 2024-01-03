import Button from 'react-bootstrap/Button';

const UnSaveItemButton = ({ savedItemID, UnSave }) => {
    
    const handleUnSave = () => {
        UnSave(savedItemID);
    }

    return (
        <Button variant='secondary' onClick={handleUnSave} style={{ marginLeft: '10px' }} className='body'>
            Unsave item
        </Button>
    )
};

export default UnSaveItemButton;