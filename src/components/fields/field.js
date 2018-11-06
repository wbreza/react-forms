import React from 'react';

export default class Field extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            form: this.props.form,
            property: this.props.property,
            elementId: `${this.props.form.name}-${this.props.property.name}`,
            value: this.props.value || ''
        };

        this.getEditor = this.getEditor.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    getEditor() {
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

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    onFieldChange(e) {
        this.setState({
            value: e.target.value
        }, () => {
            this.props.onChange({
                key: this.state.property.name,
                value: this.state.value
            })
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
                    placeholder={this.state.property.label} />
                {this.state.property.description && <small className="form-text text-muted">{this.state.property.description}</small>}
            </div>
        );
    }
}