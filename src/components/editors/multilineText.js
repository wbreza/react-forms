import React from 'react';

const MultilineTextEditor = ({ id, type, value, placeholder, required, onChange }) => {
    return (
        <textarea
            id={id}
            className="form-control"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows="4"
        ></textarea>
    );
}

export default MultilineTextEditor;