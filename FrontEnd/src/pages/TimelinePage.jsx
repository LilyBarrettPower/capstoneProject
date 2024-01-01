// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import ItemCard from "../components/ItemCard";
import { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:3307/rentshare/items/getall?searchQuery=${searchQuery}&category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`);

                if (!response.ok) {
                    throw new Error(`Error fetching items: ${response.status} - ${response.statusText}`);
                }

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const result = await response.json();
                    setItemsData(result.data);
                } else {
                    throw new Error("Response is not in JSON format");
                }
            } catch (error) {
                console.error(error);
                // Handle the error, e.g., display an error message to the user
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [searchQuery, selectedCategory, minPrice, maxPrice]); // Empty dependency array ensures that the effect runs once, similar to componentDidMount

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
                    <Col md={2}>
                        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                        <Filters
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onMinPriceChange={setMinPrice}
                            onMaxPriceChange={setMaxPrice}
                        />
                    </Col>
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

