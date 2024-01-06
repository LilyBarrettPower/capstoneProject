import Button from 'react-bootstrap/Button';


const DeleteListingButton = ({onDeleteListing }) => {

    const handleDeleteingListing = () => {
        onDeleteListing();
    }

    return (
        <Button variant='danger' onClick={handleDeleteingListing}>
            Delete Listing
        </Button>
    );
};

export default DeleteListingButton;
