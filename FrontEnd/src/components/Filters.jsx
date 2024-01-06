
import React from 'react';
import Form from 'react-bootstrap/Form';

const Filters = ({ selectedCategory, onCategoryChange, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
    return (
        <Form>
            <Form.Group controlId="categoryFilter" style={{ marginBottom: '10px' }}>
                <Form.Control
                    as="select"
                    value={selectedCategory}
                    className='body'
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Jewellery'>Jewellery</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Homeware'>Homeware</option>
                    <option value='SportingGoods'>Sporting goods</option>
                    <option value='PetSupplies'>Pet supplies</option>
                    <option value='Machinery'>Machinery</option>
                    <option value='FarmingEquipment'>Farming equipment</option>
                    <option value='HomeImprovement'>Home improvement</option>
                    <option value='Miscellaneous'>Miscellaneous</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="priceRange" style={{ marginTop: '10px' }}>
                <Form.Control
                    type="number"
                    placeholder="Min Price"
                    className='body'
                    value={minPrice}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                />
                <Form.Control
                    type="number"
                    placeholder="Max Price"
                    className='body'
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};

export default Filters;