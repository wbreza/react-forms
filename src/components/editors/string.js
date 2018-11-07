import React from 'react';

const TextEditor = ({ id, type, value, placeholder, required, isValid, touched, onChange }) => {
    const classNames = ['form-control']
    if (touched && isValid) {
        classNames.push('is-valid');
    } else if (touched && !isValid) {
        classNames.push('is-invalid');
    }

    return (
        <input
            id={id}
            className={classNames.join(' ')}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    );
}

export default TextEditor;