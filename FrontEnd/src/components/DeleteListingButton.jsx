import Button from 'react-bootstrap/Button';


const DeleteListingButton = ({onDeleteListing }) => {

    const handleDeleteingListing = () => {
        onDeleteListing();
    }

    return (
        <Button variant='secondary' className='body mx-2' onClick={handleDeleteingListing}>
            Delete Listing
        </Button>
    );
};

export default DeleteListingButton;
