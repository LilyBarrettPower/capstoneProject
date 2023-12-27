// import the relevant components:
import ItemCard from '../components/ItemCard';
import ProfileInfo from '../components/ProfileInfo';
import CreatePostButton from '../components/CreatePostButton';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext';

// This is all currently for testing!
function ProfilePage() {

    // use the context custom hook:
    const currentUser = useUserContext();

    console.log(currentUser);
    // Testing item data before adding the database
    const itemsData = [
        { ItemName: 'test item 1', ItemDescription: 'testing', ItemPricePerDay: 20, ItemFeaturedImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIF_8BvUeewoE1lJ7Y16ibY250r7R0_0XfLZtg3Vj6cA&s', ItemCategory: 'animals', ItemLocation: 'Canterbury', ItemSecondImage: 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg', ItemThirdImage: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' },
        { ItemName: 'test item 2', ItemDescription: 'testing', ItemPricePerDay: 40, ItemFeaturedImage: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*', ItemCategory: 'animals', ItemLocation: 'Canterbury', ItemSecondImage: 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg', ItemThirdImage: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' }
    ];

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
        <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px'}}>
            <Row>
                <Col md={2}> {/* Adjust the column size based on your needs */}
                    <ProfileInfo currentUser={currentUser} />
                    </Col>
                    <Col md={10}> {/* Adjust the column size based on your needs */}
                        <h3 className='headings'>For rent:</h3>
                        <CreatePostButton /> 
                        {/* Need to change this so that it comes up beside the For rent heading */}
                    <div className='d-flex flex-column justify-content-around'>
                        {itemsData.map((item, index) => (
                            <ItemCard key={index} itemData={item} />
                        ))}
                    </div>
                </Col>
            </Row>
            </Container>

    </>
    );
}


export default ProfilePage;