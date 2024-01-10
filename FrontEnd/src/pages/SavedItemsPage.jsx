// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import SavedItemsCard from "../components/SavedItemsCard";
import { useUserContext } from '../context/userContext';
import useFetch from "../hooks/UseFetch";

// import the relavant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useState, useEffect } from "react";

function SavedItemsPage() {
    const currentUser = useUserContext();
    const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID,10)}`;

    const [userSavedItems, setUserSavedItems] = useState([]);
    const [errorSavedItems, setErrorSavedItems] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(userSavedItemsUrl);
                const result = await response.json();

                if (response.ok) {
                    setUserSavedItems(result.data);
                } else {
                    setErrorSavedItems(result.error);
                }
            } catch (error) {
                setErrorSavedItems(error.message);
            }
        };

        fetchData();
    }, [userSavedItemsUrl]);

    if (!currentUser.currentUser.UserID) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    const handleUnsaveItem = async (savedItemID) => {
        try {
            const response = await fetch(`http://localhost:3307/rentshare/saveditems/${savedItemID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("Item unsaved successfully!");
                alert("Item removed from saved items");
                setUserSavedItems((prevSavedItems) => prevSavedItems.filter((item) => item.SavedItemID !== savedItemID));
            } else {
                console.error("Error unsaving item:", response.statusText);
            }
        } catch (error) {
            console.error("Error unsaving item:", error.message);
        }
    };

    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
            <Container fluid style={{ paddingLeft: '80px', paddingRight: '20px' }}>
                <Row>
                    <Col md={6}>
                        <h3 className='headings' style={{ marginBottom: '55px' }}>Items you have saved:</h3>
                        {userSavedItems.length > 0 ? (
                            <SavedItemsCard savedItems={userSavedItems} onUnSave={handleUnsaveItem} />
                        ) : (
                            <div>No saved items</div>
                        )}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default SavedItemsPage;