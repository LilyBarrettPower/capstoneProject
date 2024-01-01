
import React from 'react';
import Form from 'react-bootstrap/Form';

const Filters = ({ selectedCategory, onCategoryChange, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
    return (
        <Form>
            <Form.Group controlId="categoryFilter" style={{ marginBottom: '10px' }}>
                <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more categories as needed */}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="priceRange" style={{ marginTop: '10px' }}>
                <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                />
                <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};

export default Filters;