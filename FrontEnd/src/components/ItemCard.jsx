import Card from 'react-bootstrap/Card'


const ItemCard = ({ itemData }) => { //Replace itemData with the correct name for the table in database when constructed
    return (
        <Card style={{ width: '30%', margin: '10px' }}>
            <div className="d-flex">
                <div style={{ float: 'left', width: '70%' }}>
                    <Card.Body>
                        <Card.Title className="headings">{itemData.ItemName}</Card.Title>
                        <Card.Text className="body">{itemData.ItemDescription}</Card.Text>
                        <Card.Text className="body">${itemData.ItemPricePerDay} Per Day</Card.Text>
                    </Card.Body>
                </div>
                <div style={{ float: 'right', width: '30%', display: 'flex', justifyContent: "center" }}>
                    <Card.Img src={itemData.ItemFeaturedImage} alt={itemData.ItemName} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', margin: '10px' }} />
                </div>
            </div>
        </Card>
    )
}

export default ItemCard;