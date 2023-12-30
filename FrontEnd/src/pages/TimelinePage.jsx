// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import ItemCard from "../components/ItemCard";
import { useState, useEffect } from 'react';

// import the relevant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useUserContext } from '../context/userContext';

function TimelinePage() {
    // Use the context custom hook
    const { currentUser } = useUserContext();
    const [itemsData, setItemsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3307/rentshare/items/getall');
                if (response.ok) {
                    const result = await response.json();
                    setItemsData(result.data);
                } else {
                    console.error('Error fetching items', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching items', error);
            } finally {
                setIsLoading(false); // Set loading state to false regardless of success or failure
            }
        };

        fetchItems();
    }, []); // Empty dependency array ensures that the effect runs once, similar to componentDidMount

    // Render the component
    if (isLoading) {
        return <p>Loading...</p>; // Render a loading indicator while data is being fetched
    }

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
            <h1>Timeline page</h1>
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={10}>
                        {itemsData.length > 0 ? (
                            <div className='d-flex flex-column justify-content-around'>
                                {itemsData.map((item, index) => (
                                    <ItemCard key={index} itemData={item} />
                                ))}
                            </div>
                        ) : (
                            <p>No items available.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TimelinePage;

