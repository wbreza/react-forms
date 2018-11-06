import React from 'react';

const TextEditor = ({ id, type, value, placeholder, required, onChange }) => {
    return (
        <input
            id={id}
            className="form-control"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    );
}

export default TextEditor;