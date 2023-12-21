import ItemCard from '../components/ItemCard';
import ProfileInfo from '../components/ProfileInfo';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import CreatePostButton from '../components/CreatePostButton';

// This is all currently for testing!
function ProfilePage() {

    const userData = {
        FullName: 'Lily Barrett-Power',
        Location: 'Canterbury',
        Contact: '0220215282',
        ProfilePhoto: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D'
    };

    // Testing item data before adding the database
    const itemsData = [
        { ItemName: 'test item 1', ItemDescription: 'testing', ItemPricePerDay: 20, ItemFeaturedImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIF_8BvUeewoE1lJ7Y16ibY250r7R0_0XfLZtg3Vj6cA&s', ItemCategory: 'animals', ItemLocation: 'Canterbury', ItemSecondImage: 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg', ItemThirdImage: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' },
        { ItemName: 'test item 2', ItemDescription: 'testing', ItemPricePerDay: 40, ItemFeaturedImage: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*', ItemCategory: 'animals', ItemLocation: 'Canterbury', ItemSecondImage: 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg', ItemThirdImage: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg' }
    ];

    return (
        <>
        <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px'}}>
            <Row>
                <Col md={2}> {/* Adjust the column size based on your needs */}
                    <ProfileInfo userData={userData} />
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