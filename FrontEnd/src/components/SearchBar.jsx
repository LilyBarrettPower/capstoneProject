import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <Form.Group controlId="searchQuery" className="mx-auto">
            <Form.Control
                type="text"
                placeholder="Search by Item Name"
                className='body'
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </Form.Group>
    );
};

export default SearchBar;
