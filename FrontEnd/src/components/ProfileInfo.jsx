import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';

function ProfileInfo({ userData }) { //swap userData for the actual database 
    const { FullName, Location, Contact, ProfilePhoto } = userData;

    return (
        <Container className="d-flex flex-column align-items-center" style={{width: '10%', margin: '10px'}}>
            <Image src={ProfilePhoto} alt={FullName} roundedCircle style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <div>
                <p className="body">{FullName}</p>
                <p className="body">{Location}</p>
                <p className="body">{Contact}</p>
            </div>
        </Container>
    )
}
export default ProfileInfo;