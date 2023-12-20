import ItemCard from '../components/ItemCard';

// This is all currently for testing!
function ProfilePage() {
    const itemsData = [
        { ItemName: 'test item 1', ItemDescription: 'testing', ItemPricePerDay: 20, ItemFeaturedImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIF_8BvUeewoE1lJ7Y16ibY250r7R0_0XfLZtg3Vj6cA&s' },
        { ItemName: 'test item 2', ItemDescription: 'testing', ItemPricePerDay: 40, ItemFeaturedImage: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*' }
    ];

    return (
        <div>
            <h1 className='headings'>Your profile page</h1>
            <div>
                {itemsData.map((item, index) => (
                    <ItemCard key={index} itemData={item}/>
                ))}
            </div>
        </div>
    )
}

export default ProfilePage;