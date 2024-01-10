import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';
import { useEffect } from 'react';
import CreatePostButton from './CreatePostButton';

import { useUserContext } from '../context/userContext';

function ProfileInfo() { 
    // using the useUserContext custom hook
    const { currentUser } = useUserContext();


    if (!currentUser) {
        return null;
    }

    const { FullName, Location, Contact, ProfilePhoto } = currentUser;


    useEffect(() => {
        return () => {
            // Cleanup object URL when the component unmounts
            if (currentUser.ProfilePhoto instanceof File) {
                URL.revokeObjectURL(currentUser.ProfilePhoto);
            }
        };
    }, [currentUser]);

    return (
        <Container className="d-flex flex-column align-items-center" style={{ width: '10%', margin: '10px' }}>
            <Image src={ProfilePhoto} alt={FullName} roundedCircle style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '10px', border: '2px solid #000' }} />
            <div>
                <p className="headings" style={{fontSize: "25px"}}>{FullName}</p>
                <p className="body">{Location}</p>
                <p className="body">{Contact}</p>
            </div>
        </Container>
    )
}
export default ProfileInfo;