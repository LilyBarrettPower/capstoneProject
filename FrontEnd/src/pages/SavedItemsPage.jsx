// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import SavedItemsCard from "../components/SavedItemsCard";
import { useUserContext } from '../context/userContext';
import useFetch from "../hooks/useFetch";

// import the relavant bootstrap:
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';

import { useState, useEffect } from "react";

function SavedItemsPage() {
    // get the current user from the context
    const currentUser = useUserContext();
    // get the url for saved items 
    const userSavedItemsUrl = `http://localhost:3307/rentshare/saveditems/getsaveddetails/${parseInt(currentUser.currentUser.UserID,10)}`;
    // state for saved items
    const [userSavedItems, setUserSavedItems] = useState([]);
    const [errorSavedItems, setErrorSavedItems] = useState(null);
    // fetch the saved items for the current user 
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
        return <div className="headings">No user logged in</div>; 
    }

    const handleUnsaveItem = async (savedItemID) => {
        try {
            // use the API to delete the item from the saved items table for that user
            const response = await fetch(`http://localhost:3307/rentshare/saveditems/${savedItemID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("Item unsaved successfully!");
                alert("Item removed from saved items");
                // update the UI
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
            <h3 className='headings italic' style={{ marginBottom: '25px', marginTop: '25px', marginLeft: '50px' }}>Items you have saved:</h3>
            <Container fluid className="d-flex">
                <Row>
                    <Col md={8}>
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