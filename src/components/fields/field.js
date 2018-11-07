import React from 'react';

export default class Field extends React.Component {
    state = {
        form: this.props.form,
        property: this.props.property,
        validator: this.props.validator,
        elementId: `${this.props.form.name}-${this.props.property.name}`,
        value: this.props.value || '',
        touched: false,
        isValid: false,
        errors: []
    };

    getEditor = () => {
        let editor = null;
        const editorType = this.state.property.editor || this.state.property.type;
        try {
            editor = require(`../editors/${editorType}`);
        }
        catch (e) {
            console.warn(`Unable to load Editor Type '${editorType}'. Falling back to string`)
            editor = require('../editors/string');
        }

        return editor.default;
    }

    validate = (value) => {
        return this.state.validator.validate(value)
            .then(errors => {
                this.setState({
                    errors: errors,
                    isValid: errors.length === 0
                });

                return errors;
            });
    }

    onFieldChange = (e) => {
        const formValue = e.target.value;
        this.validate(formValue).then(() => {
            this.setState({
                value: formValue,
                touched: true
            }, () => {
                this.props.onChange({
                    key: this.state.property.name,
                    value: this.state.value
                });
            });
        });
    }

    render() {
        const Editor = this.getEditor()

        return (
            <div className="form-group">
                <label htmlFor={this.state.elementId}>{this.state.property.label}</label>
                <Editor
                    id={this.state.elementId}
                    type={this.state.property.type}
                    value={this.state.value}
                    onChange={this.onFieldChange}
                    required={this.state.property.required}
                    isValid={this.state.isValid}
                    touched={this.state.touched}
                    placeholder={this.state.property.label} />
                {this.state.property.description && <small className="form-text text-muted">{this.state.property.description}</small>}
                {this.state.errors.length > 0 && <div className="invalid-feedback">{this.state.errors[0].message}</div>}
            </div>
        );
    }
}