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

import '../styling/Page.css'

function TimelinePage() {
    // Use the context custom hook
    const { currentUser } = useUserContext();
    // state for the items
    const [itemsData, setItemsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    // state for the searching and filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Fetch data when the component mounts based on teh search, and filter conditions
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:3307/rentshare/items/getall?searchQuery=${searchQuery}&category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`);

                if (!response.ok) {
                    throw new Error(`Error fetching items: ${response.status} - ${response.statusText}`);
                }
                // check the response is in JSON format
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    // parse the Json data from the response 
                    const result = await response.json();
                    // update the state with the fetched data
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
            <div>
                <h2 className="headings italic text-center my-2 titleContent">What ever you're looking for, you'll find it here!</h2>
            </div>
          
            <Container fluid style={{  marginTop: '20px' }}>
                <Row className='justify-content-center'>
                    <Col md={2}>
                        <Filters
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onMinPriceChange={setMinPrice}
                            onMaxPriceChange={setMaxPrice}
                        />
                    </Col>
                    <Col md={5}>
                        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                    </Col>
                    <Col md={10} className='CardContainer mx-auto'>
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

