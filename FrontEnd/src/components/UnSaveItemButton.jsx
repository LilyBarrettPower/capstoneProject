import Button from 'react-bootstrap/Button';

const UnSaveItemButton = ({ savedItemID, UnSave }) => {
    
    const handleUnSave = () => {
        UnSave(savedItemID);
    }

    return (
        <Button variant='secondary' onClick={handleUnSave} style={{ marginLeft: '10px' }} className='body mx-2 mt-2'>
            Unsave item
        </Button>
    )
};

export default UnSaveItemButton;